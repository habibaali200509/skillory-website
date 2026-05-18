
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'ar,en',
    autoDisplay: false
  }, 'google_translate_element');
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("[data-lang-toggle]");
  const label = document.querySelector("[data-lang-label]");

  if(btn){
    btn.addEventListener("click", function(){
      const select = document.querySelector(".goog-te-combo");
      if(!select) return;

      if(select.value === "ar"){
        select.value = "en";
        label.textContent = "AR";
      } else {
        select.value = "ar";
        label.textContent = "EN";
      }

      select.dispatchEvent(new Event("change"));
      localStorage.setItem("language", select.value);
    });
  }

  setTimeout(() => {
    const saved = localStorage.getItem("language");
    const select = document.querySelector(".goog-te-combo");

    if(saved && select){
      select.value = saved;
      select.dispatchEvent(new Event("change"));
    }
  }, 1500);
});
