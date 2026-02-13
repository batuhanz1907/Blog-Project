import { createContext, useContext, useEffect, useState } from "react"; // component içinde değişebilen verileri tutuyoruz , yazılmasaydı eğer postlar gözükmezdi
// ts ile veri tanımlıyoruz - interface ile başka dosyalarda da kullanıyoruz
export interface Post {
  id: number;
  title: string;
  content?: string;
  description: string;
  createdAt: string;
}
// tekrardan başka dosyalarda kullanacağımız verileri tanımlıyoruz -
interface PostContextType {
  posts: Post[];
  loading: boolean; // veri yüklenme ktsi
  addPost: (post: Post) => void; // post ekleme
  deletePost: (id: number) => void; // id ile post silme
}

const PostContext = createContext<PostContextType | undefined>(undefined); // context oluşturuyoruz - henüz değer verilmediyse undf
// postcontexte veri sağlıyoruz
export function PostProvider({ children }: { children: React.ReactNode }) {
  // postprovider - render edebileceğimiz tüm verileri children ile alıyoruz
  const [posts, setPosts] = useState<Post[]>([]); // post listesini setPost ile güncelliyoruz
  const [loading, setLoading] = useState(true); // postların hazır olup olmadığını kontrol ediyoruz

  useEffect(() => { 
    const timeout = setTimeout(() => { // 300ms için id tanımlıyoruz
      const saved = localStorage.getItem("posts"); // local kayıt var mı yok mu sorgusu
      setPosts(saved ? JSON.parse(saved) : []); // save kt ediliyor yoksa boş döner 
      setLoading(false); // yükleniyor durumunu sonlandırıyoruz 
    }, 300);

    return () => clearTimeout(timeout); // cleanup fonksiyonu ekliyoruz 
  }, []);

  useEffect(() => {
    // işlem başlatıyoruz
    if (!loading) {
      // update işleminin kontrolünü sağlıyoruz
      localStorage.setItem("posts", JSON.stringify(posts)); // f5 ile verilerin kaybolmasını önlemek için itemleri lsye kaydediyoruz
    }
  }, [posts, loading]);

  const addPost = (post: Post) => {
    // post ekleme fonks ekliyoruz
    setPosts((prev) => [post, ...prev]); // yeni pstların ilk  önce gözükmesini sağlıyoruz
  };

  const deletePost = (id: number) => {
    // post silme fonks ekliyoruz
    setPosts((prev) => prev.filter((p) => p.id !== id)); // var olan post dizisini alıyoruz , id kontrolü ile silme işlemini tamamlıyoruz
  };
  // aynı başlık , içerik ve açıklama ihtimaline karşı postu id ile siliyoruz
  return (
    // tanımlanan verileri ulaşılabilir hale getiriyoruz
    <PostContext.Provider value={{ posts, loading, addPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => {
  // usePosts verisi ile alt complara ulaşıyoruz
  const context = useContext(PostContext); // posts , loading gibi verileri tutuyoruz
  if (!context) {
    // context doğruluğunu if yapısı ile teyit ediyoruz
    throw new Error("usePosts PostProvider içinde kullanılmalı");
  }
  return context; // işlemi ve değerleri döndürüyoruz
};