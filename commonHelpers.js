import{a as h,S as m,i}from"./assets/vendor-64b55ca9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();async function y(l,o=1){const a={key:"42320428-e8ed9ab9e474091db19815d3a",q:l,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40};try{const e=new URLSearchParams(a).toString();return(await h.get(`https://pixabay.com/api/?${e}`)).data}catch{throw new Error("Failed to fetch data")}}const u={formEL:document.querySelector(".js-search-form"),listEL:document.querySelector(".gallery")};let c=null;function p(l){const o={captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animation:250,widthRatio:.9,scaleImageToRatio:!0},r=l.hits.map(a=>`<li class="gallery-item"><a href="${a.webformatURL}">
          <img class="gallery-image" src="${a.webformatURL}" alt="${a.tags}"></a>
          <div class="bloc-content">
          <p><b>Likes: </b>${a.likes}</p>
          <p><b>Views: </b>${a.views}</p>
          <p><b>Comments: </b>${a.comments}</p>
          <p><b>Downloads: </b>${a.downloads}</p>
          </div>
          </li>`).join("");u.listEL.insertAdjacentHTML("beforeend",r),c&&c.destroy(),c=new m(".gallery a",o),u.formEL.reset()}const d={lastSearchData:null},t={formEL:document.querySelector(".js-search-form"),loaderEl:document.querySelector(".loader"),galleryList:document.querySelector(".gallery"),buttonLoad:document.querySelector(".btn-load"),loaderMore:document.querySelector(".loader-more")};t.loaderEl.style.display="none";t.loaderMore.style.display="none";t.formEL.addEventListener("submit",async l=>{l.preventDefault();const o=l.target.elements.query.value.trim();if(!o){i.show({message:"Please enter a valid search query.",backgroundColor:"red",position:"topRight"});return}t.galleryList.innerHTML="",t.loaderEl.style.display="block";try{const r=await y(o);d.lastSearchData=o,r.hits.length?(p(r),r.hits.length>=40&&(t.buttonLoad.style.display="block")):(t.buttonLoad.style.display="none",i.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"red",position:"topRight"}))}catch{i.show({message:"An error occurred while fetching images. Please try again later.",backgroundColor:"red",position:"topRight"})}finally{t.loaderEl.style.display="none"}l.target.reset()});t.buttonLoad.addEventListener("click",async l=>{if(!d.lastSearchData)return;const o=Math.ceil(t.galleryList.children.length/40)+1;t.loaderMore.style.display="block";try{const r=await y(d.lastSearchData,o);if(p(r),Math.ceil(r.totalHits/40)<o+1?(t.buttonLoad.style.display="none",i.show({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"blue",position:"topRight"})):t.buttonLoad.style.display="block",r.hits.length>=40){const e=t.galleryList.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}finally{t.loaderMore.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
