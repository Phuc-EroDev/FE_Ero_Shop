import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { addSlide, deleteSlide, reorderSlides, resetSlides, selectSlides } from '../redux/slides/slideSlide';

export const useSlideManagement = () => {
  const dispatch = useDispatch();
  const slides = useSelector(selectSlides);

  // Handle upload file and convert to base64
  const handleUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(new Error('Lỗi khi đọc file'));
      };
      reader.readAsDataURL(file);
    });
  };

  // Add new slide
  const handleAddSlide = async (file, name = '') => {
    try {
      const url = await handleUpload(file);
      const slideName = name || file.name.split('.')[0];

      dispatch(
        addSlide({
          url,
          name: slideName,
        }),
      );

      message.success('Thêm slide thành công!');
      return true;
    } catch (error) {
      message.error('Lỗi khi thêm slide: ' + error.message);
      return false;
    }
  };

  // Delete slide
  const handleDeleteSlide = (slideId) => {
    try {
      dispatch(deleteSlide(slideId));
      message.success('Xóa slide thành công!');
      return true;
    } catch (error) {
      message.error('Lỗi khi xóa slide: ' + error.message);
      return false;
    }
  };

  // Reorder slides (for future drag & drop)
  const handleReorderSlides = (newOrder) => {
    try {
      dispatch(reorderSlides(newOrder));
      return true;
    } catch (error) {
      message.error('Lỗi khi sắp xếp slide: ' + error.message);
      return false;
    }
  };

  // Reset to default slides
  const handleResetSlides = () => {
    try {
      dispatch(resetSlides());
      message.success('Đặt lại slides về mặc định thành công!');
      return true;
    } catch (err) {
      error('Lỗi khi reset slides: ' + err.message);
      return false;
    }
  };

  return {
    slides,
    handleAddSlide,
    handleDeleteSlide,
    handleReorderSlides,
    handleResetSlides,
    handleUpload,
  };
};
