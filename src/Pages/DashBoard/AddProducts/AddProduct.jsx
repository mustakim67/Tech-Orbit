import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (!data.image[0]) {
        toast.error("Image file is required.");
        return;
      }

      setUploading(true);

      // Upload image
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append('image', imageFile);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`, {
        method: 'POST',
        body: formData
      });

      const imgData = await res.json();

      if (!imgData.success) {
        throw new Error("Image upload failed");
      }

      const product = {
        name: data.name,
        image: imgData.data.url,
        description: data.description,
        owner: {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
        tags: tags.map(tag => tag.text),
        externalLink: data.link || null,
        status: 'pending',
        createdAt: new Date(),
      };

      await axiosSecure.post('/products', product);
      toast.success('Product submitted for review!');
      reset();
      setTags([]);
      navigate('/dashboard/my-products');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit product.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="font-medium">Product Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Enter product name"
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">Product name is required.</p>}
        </div>

        {/* Product Image Upload */}
        <div>
          <label className="font-medium">Product Image</label>
          <input
            {...register('image', { required: true })}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
          {errors.image && <p className="text-red-500 text-sm">Product image is required.</p>}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            {...register('description', { required: true })}
            rows="4"
            placeholder="Enter product description"
            className="textarea textarea-bordered w-full"
          />
          {errors.description && <p className="text-red-500 text-sm">Description is required.</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="font-medium">Tags</label>
          <ReactTags
            tags={tags}
            handleDelete={(i) => setTags(tags.filter((tag, index) => index !== i))}
            handleAddition={(tag) => setTags([...tags, tag])}
            delimiters={delimiters}
            inputFieldPosition="top"
            placeholder="Add tags"
            classNames={{
              root: 'flex flex-col gap-2',
              tagInput: 'w-full',
              tagInputField: 'input input-bordered w-full mb-2',
              tags: 'flex flex-wrap gap-2 mt-2',
              tag: 'bg-blue-100 text-blue-800 px-3 mx-2 py-1 rounded-full',
            }}
          />
        </div>

        {/* External Link */}
        <div>
          <label className="font-medium">Website Link</label>
          <input
            {...register('link')}
            type="url"
            placeholder="https://"
            className="input input-bordered w-full"
          />
        </div>

        {/* Owner Info (readonly) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-sm text-gray-500">Owner Name</label>
            <input value={user.displayName} readOnly className="input input-bordered w-full" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Owner Email</label>
            <input value={user.email} readOnly className="input input-bordered w-full" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Owner Image URL</label>
            <input value={user.photoURL} readOnly className="input input-bordered w-full" />
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="btn bg-blue-900 text-white w-full" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
