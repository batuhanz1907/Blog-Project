import { useState, useEffect } from "react"; // state yönetimi ve yan etkiler için hooklar
import { useParams, useNavigate, Link } from "react-router-dom"; // url parametreleri, yönlendirme ve link için
import { usePosts } from "../context/PostContext"; // context'ten post verilerini almak için hook

// post verilerinin tipini tanımlıyoruz
interface Post {
  id: number; 
  title: string; 
  description: string;
  content?: string; 
  createdAt: string; 
}

function PostEdit() {
  // url'den id parametresini alıyoruz
  const { id } = useParams<{ id: string }>();
  // yönlendirme için navigate hooku
  const navigate = useNavigate();
  // context'ten posts, addPost ve deletePost fonksiyonlarını alıyoruz
  const { posts, addPost, deletePost } = usePosts();

  // form state'leri - mevcut post verilerini tutacak
  const [title, setTitle] = useState(""); // başlık state'i
  const [content, setContent] = useState(""); // içerik state'i
  const [description, setDescription] = useState(""); // açıklama state'i
  const [loading, setLoading] = useState(true); // yüklenme durumu

  // sayfa yüklendiğinde mevcut post verilerini forma dolduruyoruz
  useEffect(() => {
    // id'ye göre postu bul
    const post = posts.find((p) => p.id.toString() === id);

    if (post) { // post bulunduysa
      setTitle(post.title); // başlığı set et
      setDescription(post.description); // açıklamayı set et
      setContent(post.content || ""); // içeriği set et (yoksa boş string)
    }
    setLoading(false); // yükleme tamamlandı
  }, [id, posts]); // id veya posts değişirse tekrar çalıştır

  // form submit işlemi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // sayfa yenilenmesini engelliyoruz

    // başlık ve açıklama kontrolü
    if (!title.trim() || !description.trim()) {
      alert("Başlık ve açıklama zorunludur."); // hata mesajı
      return; // fonksiyonu durdur
    }

    // önce eski postu siliyoruz - context üzerinden
    deletePost(Number(id));
    
    // sonra yeni postu ekliyoruz - aynı id ile
    const updatedPost = {
      id: Number(id), // aynı id'yi koru
      title, 
      description, 
      content, 
      createdAt: new Date().toISOString(), 
    };
    
    addPost(updatedPost); // contexte güncel postu ekle
    navigate(`/post/${id}`); // detail sayfasına yönlendir
  };

  // loading durumunda gösterilecek ekran
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          {/* spinner animasyonu */}
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* navbar*/}
      <nav className="bg-black text-white px-6 py-6 mb-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold uppercase tracking-widest">
            MINIBLOG
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Post Düzenle {/* sayfa başlığı */}
          </p>
        </div>
      </nav>

      {/* düzenleme formu container */}
      <div className="max-w-2xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow space-y-4"
        >
          <h2 className="text-xl font-bold mb-4">Postu Düzenle</h2>

          {/* başlık input alanı zorunlu */}
          <input
            placeholder="Başlık * (Zorunlu)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* içerik textarea isteğe bağlı */}
          <textarea
            placeholder="İçerik (İsteğe Bağlı)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* açıklama textarea zorunlu */}
          <textarea
            placeholder="Açıklama * (Zorunlu)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* butonlar iptal ve kaydet */}
          <div className="flex justify-between items-center">
            {/* iptal linki detail sayfasına döner */}
            <Link
              to={`/post/${id}`}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              İptal
            </Link>
            {/* kaydet butonu formu submit eder */}
            <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 rounded-lg font-medium">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostEdit; 