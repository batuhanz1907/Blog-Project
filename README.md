# 📝 Blog App (React + TypeScript)

Modern ve component tabanlı bir blog uygulaması.
CRUD işlemleri, Context API ile global state yönetimi ve TypeScript ile tip güvenliği sağlanmıştır.

# 🚀 Proje Amacı

## Bu proje;

React mimarisini daha iyi kavramak

TypeScript ile tip güvenliği sağlamak

Context API ile global state yönetimi yapmak

LocalStorage ile kalıcı veri yönetimini öğrenmek

CRUD (Create, Read, Update, Delete) mantığını uygulamak

amacıyla geliştirilmiştir.

## 🛠️ Kullanılan Teknolojiler

⚛️ React

🔷 TypeScript

🌐 React Router

🧠 Context API

💾 LocalStorage

🎨 Tailwind CSS

## ✨ Özellikler

✅ Post ekleme

✅ Post listeleme

✅ Post silme

✅ Post güncelleme (Edit özelliği)

✅ Detay sayfası

✅ Global state yönetimi (Context)

✅ TypeScript ile güçlü tip kontrolü

✅ LocalStorage ile veri kalıcılığı

## 🧠 Teknik Mimari
Context API Kullanımı

Post verileri global olarak yönetilmektedir.
PostProvider ile uygulama sarmalanarak tüm bileşenlerde tekrar kullanılabilir hale getirilmiştir.

CRUD Yapısı

addPost

deletePost

updatePost

getPostById

fonksiyonları context üzerinden yönetilmektedir.

## LocalStorage Senkronizasyonu

Sayfa ilk açıldığında useEffect ile localStorage'dan veri çekilir.

Post değişimlerinde veri tekrar localStorage'a kaydedilir.

Böylece sayfa yenilense bile veriler korunur.
