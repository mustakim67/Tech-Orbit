import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [existingData, setExistingData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      setExistingData(res.data);
      setTags(res.data.tags.map(tag => ({ id: tag, text: tag })));
      setImagePreview(res.data.image);
      reset({
        name: res.data.name,
        description: res.data.description,
        link: res.data.externalLink,
      });
    };
    fetchProduct();
  }, [id, reset, axiosSecure]);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = existingData.image;

      if (data.image[0]) {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`, {
          method: 'POST',
          body: formData,
        });

        const imgData = await res.json();

        if (imgData.success) {
          imageUrl = imgData.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const updatedProduct = {
        name: data.name,
        description: data.description,
        image: imageUrl,
        tags: tags.map(t => t.text),
        externalLink: data.link || null,
        updatedAt: new Date(),
      };

      await axiosSecure.patch(`/products/${id}`, updatedProduct);
      toast.success('Product updated successfully!');
      navigate('/dashboard/my-products');
    } catch (error) {
      console.error(error);
      toast.error('Update failed.');
    }
  };

  if (!existingData)
    return (
      <div className="text-center py-10 text-base-content">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-base-content">Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="font-medium text-base-content">Product Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            className="input input-bordered w-full text-base-content"
          />
          {errors.name && <p className="text-red-500 text-sm">Product name is required.</p>}
        </div>

        {/* Image Input */}
        <div>
          <label className="font-medium text-base-content">Product Image</label>
          <input
            {...register('image')}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full text-base-content"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-40 rounded shadow dark:shadow-gray-700"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium text-base-content">Description</label>
          <textarea
            {...register('description', { required: true })}
            rows="4"
            className="textarea textarea-bordered w-full text-base-content"
          />
          {errors.description && <p className="text-red-500 text-sm">Description is required.</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="font-medium text-base-content">Tags</label>
          <ReactTags
            tags={tags}
            handleDelete={(i) => setTags(tags.filter((_, index) => index !== i))}
            handleAddition={(tag) => setTags([...tags, tag])}
            delimiters={delimiters}
            inputFieldPosition="top"
            classNames={{
              tagInputField: 'input input-bordered w-full mb-2 text-base-content',
              tags: 'flex gap-2 flex-col mt-2',
              tag: 'bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-3 py-1 mx-2 rounded-full',
            }}
          />
        </div>

        {/* External Link */}
        <div>
          <label className="font-medium text-base-content">External Link</label>
          <input
            {...register('link')}
            type="url"
            className="input input-bordered w-full text-base-content"
          />
        </div>

        <button
          type="submit"
          className="btn bg-blue-800 dark:bg-blue-700 text-base-content w-full mt-4"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
