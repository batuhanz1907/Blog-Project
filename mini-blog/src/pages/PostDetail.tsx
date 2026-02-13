import { useParams, Link, useNavigate } from "react-router-dom"; // parametreleri okutuyoruz ve sayfa değişimini oluşturuyoruz 
import { usePosts } from "../context/PostContext"; // usePosts hook'unu import ediyoruz
import { useState } from "react"; // silme kartı için state ekliyoruz

// Context'teki Post interface'i ile birebir aynı yapıyoruz
interface Post {
  id: number;
  title: string;
  content?: string;  // opsiyonel
  description: string;
  createdAt: string;
}

function PostDetails() { // post detaylarını gösterecek fonsk ekliyoruz
  const { id } = useParams<{ id: string }>(); // url parametlerini alıyoruz
  const navigate = useNavigate(); // sayfa geçişini sağlıyoruz
  const { posts, deletePost } = usePosts(); // context'ten posts ve deletePost alıyoruz
  const [showDeleteModal, setShowDeleteModal] = useState(false); // silme kartı görünürlüğü

  const post = posts.find((p) => p.id.toString() === id); // p ile postu string değere çeviriyoruz === ile kt

  if (!post) { // id ile uyuşan post yoksa eğer bulunamadı çıktısı veriyoruz
    return <p className="text-center text-gray-500 mt-10">Post bulunamadı.</p>;
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // silme kartını aç
  };

  const handleConfirmDelete = () => {
    deletePost(post.id); // context'teki deletePost fonksiyonunu kullan
    setShowDeleteModal(false); // kartı kapat
    navigate("/"); // silme işlemi sonrası anasayfaya yönlendiriyoruz
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // silme kartını kapat
  };

  const handleEdit = () => {
    navigate(`/post/edit/${post.id}`); // Düzenleme sayfasına yönlendir
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg p-6">
        {/* header */}
        <h1 className="text-2xl font-bold mb-2 break-words overflow-hidden">
          {post.title}
        </h1>

        {/* date */}
        <span className="text-sm text-gray-400 block mb-4">
          {new Date(post.createdAt).toLocaleString("tr-TR")}
        </span>

        {/* content - opsiyonel olduğu için kontrol ediyoruz */}
        {post.content && (
          <p className="text-gray-700 mb-4 leading-relaxed break-words overflow-hidden">
            {post.content}
          </p>
        )}

        {/* desc */}
        <p className="text-gray-800 leading-relaxed mb-6 break-words overflow-hidden">
          {post.description}
        </p>

        {/* button */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 px-4 py-2 rounded-lg shadow hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
          >
            ⏪ Geri dön
          </Link>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
            >
              🖊️ Düzenle
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
            >
              🗑 Sil
            </button>
          </div>
        </div>
      </div>

     // Silme onay modalı -ffixed
{showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Arkaplan overlay */}
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity animate-fadeIn"
      onClick={handleCancelDelete}
    ></div>
    
    {/* Modal kartı */}
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-slideUp">
      {/* Uyarı ikonu */}
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
        <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      {/* Başlık */}
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
        Postu Sil
      </h3>
      
      {/* Açıklama */}
      <p className="text-sm text-gray-500 text-center mb-6 break-words">
        <span className="font-semibold text-gray-700">
          "{post.title.length > 15 
            ? post.title.substring(0, 15) + '...' 
            : post.title}"
        </span> başlıklı postu silmek istediğinize emin misiniz?
        <br />Bu işlem geri alınamaz.
      </p>
      
      {/* Butonlar */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handleCancelDelete}
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
        >
          İptal
        </button>
        <button
          onClick={handleConfirmDelete}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm shadow-lg hover:shadow-xl"
        >
          Evet, Sil
        </button>
      </div>
    </div>
  </div>
)}
      {/* Tailwind animasyon sınıfları */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default PostDetails;
