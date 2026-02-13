import { useState } from "react"; // react üzerinden usestate hookunu import ediyoruz
import { Link } from "react-router-dom"; // react bileşeni 
import { usePosts } from "../context/PostContext"; // usePosts hook'unu import ediyoruz

function PostList() {
  // context'ten verileri alıyoruz
  const { posts, loading, deletePost, addPost } = usePosts();
  
  // Yerel stateler (form için)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  
  // Silme onayı için state
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; postId: number | null; postTitle: string }>({
    show: false,
    postId: null,
    postTitle: ""
  });

  const handleSubmit = (e: React.FormEvent) => { // form submit kullanıldıktan sonra çalışacak !
    e.preventDefault(); // submit işlemi sonrası sayfa yenilenmesini engelliyrouz

    if (!title.trim() || !description.trim()) { // title ve desc arealarını zorunlu kılıyoruz
      alert("Başlık ve açıklama zorunludur.");
      return;
    }

    const newPost = { // yeni post objectini oluşturuyoruz
      id: Date.now(),
      title,
      description,
      content,
      createdAt: new Date().toISOString(),
    };

    // Context'e yeni post ekliyoruz
    addPost(newPost);

    setTitle("");
    setContent("");
    setDescription("");
  };

  const handleDeleteClick = (id: number, title: string) => {
    setDeleteModal({
      show: true,
      postId: id,
      postTitle: title
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.postId) {
      deletePost(deleteModal.postId);
    }
    handleCancelDelete();
  };

  const handleCancelDelete = () => {
    setDeleteModal({
      show: false,
      postId: null,
      postTitle: ""
    });
  };

  // Loading ekranı - 300ms boyunca gösterilecek - useEffect +setTimeout
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* navbar */}
        <nav className="bg-black text-white px-6 py-6 mb-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold uppercase tracking-widest">
              MINIBLOG
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              React ve TypeScript teknolojisi ile geliştirildi
            </p>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4">
          {/* loading form */}
          <div className="bg-white p-6 rounded-2xl shadow mb-10 space-y-4 animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>

          {/* loading state */}
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Postlar yükleniyor...</p>
            <p className="text-sm text-gray-400 mt-1">(300ms gecikmeli)</p>
          </div>
        </div>
      </div> // loading false olduğunda burası render edilir - yani 300ms sonra ana içerik görünür
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* navbar */}
      <nav className="bg-black text-white px-6 py-6 mb-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold uppercase tracking-widest">
            MINIBLOG
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            React ve TypeScript teknolojisi ile geliştirildi
          </p>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4">
        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow mb-10 space-y-4"
        >
          {/* başlık */}
          <input
            placeholder="Başlık * (Zorunlu)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* içerik */}
          <textarea
            placeholder="İçerik (İsteğe Bağlı)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* açıklama */}
          <textarea
            placeholder="Açıklama * (Zorunlu)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border rounded-lg px-3 py-2"
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 rounded-lg font-medium">
            Paylaş
          </button>
        </form>

        {/* empty state */}
        {posts.length === 0 && (
          <p className="text-center text-gray-500">Henüz paylaşım yok.</p>
        )}

        {/* post liste */}
        <div className="space-y-4 pb-12">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow p-4 flex justify-between items-start relative hover:shadow-md transition"
            >
              <Link to={`/post/${post.id}`} className="flex-1 pr-4 min-w-0">
                <h2 className="font-bold text-lg break-words overflow-hidden hover:text-indigo-600 transition">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 break-all overflow-hidden">
                  {post.description}
                </p>

                <span className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString("tr-TR")}
                </span>
              </Link>

              <button
                onClick={() => handleDeleteClick(post.id, post.title)}
                className="h-fit bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-200 transition"
              >
                🗑 Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Silme onay modalı - animasyonlu ve profesyonel */}
      {deleteModal.show && (
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
            <p className="text-sm text-gray-500 text-center mb-6">
              <span className="font-semibold text-gray-700">"{deleteModal.postTitle}"</span> başlıklı postu silmek istediğinize emin misiniz?
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

export default PostList;