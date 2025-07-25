import{r as d,j as e,x as N,Q as k,t as p,V as b}from"./app-CdL2LcLc.js";import{A as F}from"./AuthenticatedLayout-DFWEqyja.js";import{z as g}from"./transition-xp4nTSKL.js";import{L as f}from"./dialog-BurBRXDm.js";function C({title:t,titleId:s,...n},i){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":s},n),t?d.createElement("title",{id:s},t):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"}))}const D=d.forwardRef(C);function E({title:t,titleId:s,...n},i){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":s},n),t?d.createElement("title",{id:s},t):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m4.5 15.75 7.5-7.5 7.5 7.5"}))}const R=d.forwardRef(E);function B({title:t,titleId:s,...n},i){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":s},n),t?d.createElement("title",{id:s},t):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))}const L=d.forwardRef(B);function V({className:t="",disabled:s,children:n,...i}){return e.jsx("button",{...i,className:`inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${s&&"opacity-25"} `+t,disabled:s,children:n})}function _({type:t="button",className:s="",disabled:n,children:i,...c}){return e.jsx("button",{...c,type:t,className:`inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${n&&"opacity-25"} `+s,disabled:n,children:i})}function M({show:t,onClose:s,onConfirm:n,title:i,message:c,processing:x}){return e.jsx(g.Root,{show:t,as:d.Fragment,children:e.jsxs(f,{as:"div",className:"relative z-50",onClose:s,children:[e.jsx(g.Child,{as:d.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e.jsx("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),e.jsx("div",{className:"fixed inset-0 z-10 overflow-y-auto",children:e.jsx("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",children:e.jsx(g.Child,{as:d.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:e.jsxs(f.Panel,{className:"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",children:[e.jsx("div",{className:"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4",children:e.jsxs("div",{className:"sm:flex sm:items-start",children:[e.jsx("div",{className:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",children:e.jsx(L,{className:"h-6 w-6 text-red-600","aria-hidden":"true"})}),e.jsxs("div",{className:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",children:[e.jsx(f.Title,{as:"h3",className:"text-base font-semibold leading-6 text-gray-900",children:i}),e.jsx("div",{className:"mt-2",children:e.jsx("p",{className:"text-sm text-gray-500",children:c})})]})]})}),e.jsxs("div",{className:"bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6",children:[e.jsx(V,{onClick:n,disabled:x,className:"sm:ml-3",children:x?"Excluindo...":"Excluir"}),e.jsx(_,{onClick:s,disabled:x,children:"Cancelar"})]})]})})})})]})})}function T({data:t,columns:s,keyField:n="id"}){const[i,c]=d.useState([]),x=o=>{c(l=>l.includes(o)?l.filter(r=>r!==o):[...l,o])};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hidden md:block overflow-x-auto rounded-xl shadow-lg",children:e.jsxs("table",{className:"min-w-full divide-y divide-gray-200",children:[e.jsx("thead",{className:"bg-gradient-to-r from-pink-50 to-purple-50",children:e.jsx("tr",{children:s.map((o,l)=>e.jsx("th",{className:"px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700",children:o.header},l))})}),e.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:t.map((o,l)=>e.jsx("tr",{className:"hover:bg-gray-50 transition-colors duration-200",style:{animationDelay:`${l*.05}s`},children:s.map((r,m)=>e.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900",children:r.render?r.render(o):o[r.accessor]},m))},o[n]))})]})}),e.jsx("div",{className:"md:hidden space-y-4",children:t.map((o,l)=>e.jsxs("div",{className:"bg-white rounded-xl shadow-md overflow-hidden animate-fadeInUp",style:{animationDelay:`${l*.05}s`},children:[e.jsx("div",{className:"bg-gradient-to-r from-pink-50 to-purple-50 p-4",children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsx("div",{className:"flex-1",children:s.slice(0,2).map((r,m)=>e.jsxs("div",{className:"mb-2",children:[e.jsxs("span",{className:"text-xs text-gray-600 uppercase font-semibold",children:[r.header,":"]}),e.jsx("div",{className:"text-sm font-medium text-gray-900 mt-1",children:r.render?r.render(o):o[r.accessor]})]},m))}),e.jsx("button",{onClick:()=>x(o[n]),className:"ml-4 p-2 rounded-full hover:bg-white/50 transition-colors duration-200",children:i.includes(o[n])?e.jsx(R,{className:"h-5 w-5 text-gray-600"}):e.jsx(D,{className:"h-5 w-5 text-gray-600"})})]})}),i.includes(o[n])&&e.jsx("div",{className:"px-4 py-3 bg-gray-50 space-y-3 animate-slideDown",children:s.slice(2).map((r,m)=>e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("span",{className:"text-xs text-gray-600 uppercase font-semibold",children:[r.header,":"]}),e.jsx("div",{className:"text-sm text-gray-900 text-right ml-2",children:r.render?r.render(o):o[r.accessor]})]},m))}),s.some(r=>r.mobileQuickView)&&e.jsx("div",{className:"px-4 py-2 bg-white border-t border-gray-100 flex justify-between items-center",children:s.filter(r=>r.mobileQuickView).map((r,m)=>e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-xs text-gray-500",children:r.header}),e.jsx("div",{className:"text-sm font-semibold text-gray-900",children:r.render?r.render(o):o[r.accessor]})]},m))})]},o[n]))}),e.jsx("style",{jsx:!0,children:`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        max-height: 0;
                    }
                    to {
                        opacity: 1;
                        max-height: 500px;
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                    opacity: 0;
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out forwards;
                }
            `})]})}function P({sales:t}){const[s,n]=d.useState(!1),[i,c]=d.useState(null),{delete:x,processing:o}=N(),l=a=>{c(a),n(!0)},r=()=>{i&&x(route("sales.destroy",i.id),{onSuccess:()=>{b.success("Venda excluída com sucesso!"),n(!1),c(null)},onError:()=>{b.error("Erro ao excluir a venda."),n(!1),c(null)}})},m=()=>{n(!1),c(null)},y=a=>{const h={pendente:"bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300",aprovado:"bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300",recusado:"bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300",cancelado:"bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300",estornado:"bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300"},j={pendente:"Pendente",aprovado:"Aprovado",recusado:"Recusado",cancelado:"Cancelado",estornado:"Estornado"},w={pendente:"⏳",aprovado:"✅",recusado:"❌",cancelado:"⚪",estornado:"🔄"};return e.jsxs("span",{className:`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${h[a]} shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105`,children:[e.jsx("span",{children:w[a]}),j[a]]})},u=a=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(a),v=a=>new Date(a).toLocaleDateString("pt-BR");return e.jsxs(e.Fragment,{children:[e.jsx(k,{title:"Vendas"}),e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --primary-color: #D4A574;
                    --secondary-color: #F5E6D3;
                    --accent-color: #E8B4CB;
                    --accent-dark: #C8869B;
                    --text-dark: #2C2C2C;
                    --text-light: #666;
                    --white: #FFFFFF;
                    --gradient: linear-gradient(135deg, #D4A574 0%, #E8B4CB 100%);
                    --gradient-soft: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%);
                    --gradient-hero: linear-gradient(135deg, rgba(212, 165, 116, 0.95) 0%, rgba(232, 180, 203, 0.95) 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .sales-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 50%, #F0F9FF 100%);
                    min-height: 100vh;
                }

                .card-gradient {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                    backdrop-filter: blur(10px);
                }

                .card-gradient:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-hover);
                    border-color: var(--primary-color);
                }

                .table-row {
                    transition: all 0.3s ease;
                    border-radius: 15px;
                    margin: 8px 0;
                }

                .table-row:hover {
                    background: var(--gradient-soft) !important;
                    transform: translateX(5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }

                .btn-gradient {
                    background: var(--gradient);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    border-radius: 15px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .btn-gradient::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.6s;
                }

                .btn-gradient:hover::before {
                    left: 100%;
                }

                .btn-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-hover);
                }

                .action-btn {
                    padding: 8px 16px;
                    border-radius: 10px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                    margin: 2px;
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }

                .action-btn-view {
                    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
                    color: white;
                }

                .action-btn-edit {
                    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                    color: white;
                }

                .action-btn-delete {
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                    color: white;
                }

                .action-btn-payment {
                    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                    color: white;
                }

                .floating-particles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 1;
                }

                .particle {
                    position: absolute;
                    background: rgba(212, 165, 116, 0.1);
                    border-radius: 50%;
                    animation: float 15s infinite linear;
                }

                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .header-gradient {
                    background: var(--gradient);
                    color: white;
                    border-radius: 20px;
                    padding: 20px;
                    margin-bottom: 30px;
                    box-shadow: var(--shadow);
                }

                .table-header {
                    background: var(--gradient);
                    color: white;
                    border-radius: 15px 15px 0 0;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .empty-state {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    padding: 60px 40px;
                    text-align: center;
                    box-shadow: var(--shadow);
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }

                .empty-state:hover {
                    border-color: var(--primary-color);
                    box-shadow: var(--shadow-hover);
                }

                .pagination-btn {
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .pagination-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .pagination-active {
                    background: var(--gradient) !important;
                    color: white !important;
                }
            `}),e.jsx("div",{className:"floating-particles",children:Array.from({length:15},(a,h)=>e.jsx("div",{className:"particle",style:{left:Math.random()*100+"%",width:Math.random()*8+4+"px",height:Math.random()*8+4+"px",animationDelay:Math.random()*15+"s",animationDuration:Math.random()*10+10+"s"}},h))}),e.jsx(F,{header:e.jsx("div",{className:"header-gradient",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm",children:e.jsx("i",{className:"fas fa-chart-line"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold leading-tight",children:"💼 Minhas Vendas"}),e.jsx("p",{className:"text-white/80 text-sm",children:"Gerencie suas vendas com elegância"})]})]}),e.jsx(p,{href:route("sales.create"),children:e.jsxs("button",{className:"btn-gradient text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300",children:[e.jsx("i",{className:"fas fa-plus mr-2"}),"Nova Venda"]})})]})}),children:e.jsx("div",{className:"sales-bg relative z-10",children:e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:e.jsx("div",{className:"card-gradient overflow-hidden",children:e.jsx("div",{className:"p-8 text-gray-900",children:t.data.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-full flex items-center justify-center",children:e.jsx("i",{className:"fas fa-shopping-bag text-4xl text-pink-500"})}),e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Nenhuma venda registrada ainda! 🌟"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8 max-w-md mx-auto",children:"Que tal começar sua jornada de sucesso registrando sua primeira venda? Cada grande vendedora começou com uma única venda! 💪"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsx(p,{href:route("sales.create"),children:e.jsxs("button",{className:"btn-gradient text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl",children:[e.jsx("i",{className:"fas fa-rocket mr-3"}),"Registrar Primeira Venda"]})}),e.jsxs("button",{className:"bg-white/80 text-gray-700 hover:bg-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 border border-gray-200",children:[e.jsx("i",{className:"fas fa-question-circle mr-2"}),"Como Funciona?"]})]})]}):e.jsxs("div",{className:"overflow-x-auto",children:[e.jsx("div",{className:"mb-6 bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-200 rounded-xl p-4",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full flex items-center justify-center",children:e.jsx("i",{className:"fas fa-chart-bar text-white"})}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800",children:["Total de ",t.data.length," vendas registradas"]}),e.jsx("p",{className:"text-sm text-gray-600",children:"Continue assim! Cada venda te aproxima do sucesso! 🎯"})]})]})}),e.jsx(T,{data:t.data,keyField:"id",columns:[{header:"Cliente",accessor:"client_name",render:a=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold",children:a.client_name.charAt(0).toUpperCase()}),e.jsx("span",{className:"font-semibold",children:a.client_name})]})},{header:"Valor Total",accessor:"total_amount",render:a=>e.jsx("span",{className:"font-bold text-green-600",children:u(a.total_amount)}),mobileQuickView:!0},{header:"Valor Recebido",accessor:"received_amount",render:a=>e.jsx("span",{className:"font-bold text-blue-600",children:u(a.received_amount)})},{header:"Data Pagamento",accessor:"payment_date",render:a=>e.jsxs("span",{className:"text-gray-600 font-medium",children:["📅 ",v(a.payment_date)]})},{header:"Status",accessor:"status",render:a=>y(a.status),mobileQuickView:!0},{header:"Ações",accessor:"actions",render:a=>e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(p,{href:route("sales.show",a.id),className:"action-btn action-btn-view",children:[e.jsx("i",{className:"fas fa-eye mr-1"}),"Ver"]}),e.jsxs(p,{href:route("payments.index",a.id),className:"action-btn action-btn-payment",title:"Gerenciar Pagamentos",children:[e.jsx("i",{className:"fas fa-dollar-sign mr-1"}),"Pagamentos"]}),a.status==="pendente"&&e.jsxs(e.Fragment,{children:[e.jsxs(p,{href:route("sales.edit",a.id),className:"action-btn action-btn-edit",children:[e.jsx("i",{className:"fas fa-edit mr-1"}),"Editar"]}),e.jsxs("button",{onClick:()=>l(a),className:"action-btn action-btn-delete",children:[e.jsx("i",{className:"fas fa-trash mr-1"}),"Excluir"]})]})]})}]}),t.links&&t.links.length>0&&e.jsx("div",{className:"mt-8 bg-white rounded-2xl p-6 shadow-lg",children:e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center gap-4",children:[e.jsxs("div",{className:"text-sm text-gray-700 font-medium bg-gray-50 px-4 py-2 rounded-full",children:["📊 Mostrando ",t.from," a ",t.to," de ",t.total," resultados"]}),e.jsx("div",{className:"flex gap-2",children:t.links.filter(a=>a&&a.url!==null).map((a,h)=>a.url?e.jsx(p,{href:a.url,className:`pagination-btn px-4 py-2 text-sm ${a.active?"pagination-active":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,dangerouslySetInnerHTML:{__html:a.label}},h):e.jsx("span",{className:"pagination-btn px-4 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed",dangerouslySetInnerHTML:{__html:a.label}},h))})]})})]})})})})})})}),e.jsx(M,{show:s,onClose:m,onConfirm:r,title:"Excluir Venda",message:i?`Tem certeza que deseja excluir a venda para ${i.client_name}? Esta ação não pode ser desfeita.`:"",processing:o}),e.jsx("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"})]})}export{P as default};
