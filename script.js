async function fetchTikTokData() {
  const username = document.getElementById("username").value; // جلب اسم المستخدم من حقل الإدخال
  const resultDiv = document.getElementById("result"); // العنصر لعرض النتائج

  if (!username) {
    resultDiv.innerHTML = "Please enter a username!"; // رسالة إذا لم يتم إدخال اسم المستخدم
    return;
  }

  const url = `https://tiktok-api23.p.rapidapi.com/api/user/info?uniqueId=${username}`; // رابط API مع اسم المستخدم
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      'x-rapidapi-key': '71e3540f6emsh3f4adf8ad34beeap1a13dfjsn52c300603072' // مفتاح API الخاص بك
    }
  };

  try {
    const response = await fetch(url, options); // طلب البيانات من API
    if (!response.ok) {
      throw new Error("Failed to fetch data"); // خطأ إذا فشل الطلب
    }

    const data = await response.json(); // تحويل الرد إلى JSON
    console.log(data); // عرض البيانات في وحدة التحكم

    // عرض البيانات في الصفحة
    resultDiv.innerHTML = `
      <h2>Username: ${data.user.uniqueId}</h2>
      <p>Followers: ${data.user.stats.followerCount}</p>
      <p>Likes: ${data.user.stats.heartCount}</p>
      <p>Videos: ${data.user.stats.videoCount}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`; // عرض رسالة الخطأ
    console.error('Error:', error);
  }
}