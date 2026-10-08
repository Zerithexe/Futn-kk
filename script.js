const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const modal = $("#modal");
const cart = $("#cart");
const backdrop = $("#backdrop");
const itemsEl = $("#cartItems");
const countEl = $("#cartCount");
const totalEl = $("#cartTotal");
let basket = [];

function money(n){ return "₺" + n.toLocaleString("tr-TR"); }
function renderCart(){
  countEl.textContent = basket.length;
  if(!basket.length){
    itemsEl.innerHTML = '<p class="empty">Henüz operasyon seçmedin.</p>';
  }else{
    itemsEl.innerHTML = basket.map((x,i)=>`
      <div class="cart-line">
        <span>${x.name}</span>
        <span>${money(x.price)} <button data-remove="${i}" aria-label="Kaldır">×</button></span>
      </div>`).join("");
  }
  totalEl.textContent = money(basket.reduce((a,x)=>a+x.price,0));
}
function openCart(){ cart.classList.add("open"); backdrop.classList.add("open"); }
function closeAll(){ modal.classList.remove("open"); cart.classList.remove("open"); backdrop.classList.remove("open"); }

$$(".add").forEach(btn => btn.addEventListener("click",()=>{
  basket.push({name:btn.dataset.name,price:Number(btn.dataset.price)});
  renderCart();
  openCart();
}));
itemsEl.addEventListener("click",(e)=>{
  const i=e.target.dataset.remove;
  if(i!==undefined){ basket.splice(Number(i),1); renderCart(); }
});
$("#cartOpen").addEventListener("click",openCart);
$("#cartClose").addEventListener("click",closeAll);
$("#modalClose").addEventListener("click",closeAll);
backdrop.addEventListener("click",closeAll);
$("#briefingBtn").addEventListener("click",()=>{modal.classList.add("open");});
$("#checkout").addEventListener("click",()=>{
  if(!basket.length){ alert("Önce en az bir operasyon seçmelisin."); return; }
  alert("Operasyon başlatıldı. Futnık yönetimi durumdan haberdar edildi.");
  basket=[]; renderCart(); closeAll();
});
document.addEventListener("keydown",(e)=>{if(e.key==="Escape") closeAll();});

$$('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>closeAll()));
renderCart();
