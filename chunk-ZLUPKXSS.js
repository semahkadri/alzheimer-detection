import{a as T}from"./chunk-3AMDDGQS.js";import"./chunk-X2FWJVGO.js";import{b as L,c as j,d as q,e as A,f as Y,g as W,p as B,q as R,r as U,u as G}from"./chunk-JFFEVNN4.js";import{a as H}from"./chunk-KLBCIYXG.js";import"./chunk-G23MBNRK.js";import{b as V,d as D,e as N}from"./chunk-7JCHU7QU.js";import{Bb as k,Db as E,Fa as x,Ga as S,Ha as d,Jb as z,La as e,Ma as i,Na as c,Qa as I,Ra as y,Sa as v,W as O,Xa as C,Ya as o,Za as p,_a as u,ba as h,ca as f,cb as P,db as w,eb as M,gb as F,qa as t,ra as b}from"./chunk-WLCN34OF.js";function J(r,_){if(r&1&&(e(0,"div",32),c(1,"i",33),e(2,"span"),o(3),i()()),r&2){let s=v();t(3),p(s.erreur)}}function K(r,_){if(r&1&&(e(0,"div",34),o(1),i()),r&2){let s=v();t(),u(" ",s.t.isFr?"Veuillez entrer un email valide.":"Please enter a valid email."," ")}}function Q(r,_){if(r&1&&(e(0,"div",34),o(1),i()),r&2){let s=v();t(),u(" ",s.t.isFr?"Le mot de passe doit contenir au moins 6 caracteres.":"Password must be at least 6 characters."," ")}}function X(r,_){r&1&&c(0,"span",35)}var dn=(()=>{class r{constructor(s,l,n,m){this.t=s,this.authService=l,this.router=n,this.route=m,this.email="",this.motDePasse="",this.showPassword=!1,this.enCours=!1,this.erreur="",this.redirectUrl="/",this.redirectUrl=this.route.snapshot.queryParamMap.get("redirect")||"/"}onConnexion(s){if(s.invalid)return;this.erreur="",this.enCours=!0;let l={email:this.email,motDePasse:this.motDePasse};this.authService.connexion(l).subscribe({next:()=>{this.enCours=!1,this.router.navigateByUrl(this.redirectUrl)},error:n=>{this.enCours=!1,n.status===0?this.erreur=this.t.isFr?"Service temporairement indisponible. Veuillez r\xE9essayer dans quelques instants.":"Service temporarily unavailable. Please try again shortly.":this.erreur=n?.error?.message||(this.t.isFr?"Email ou mot de passe incorrect.":"Incorrect email or password.")}})}static{this.\u0275fac=function(l){return new(l||r)(b(H),b(T),b(D),b(V))}}static{this.\u0275cmp=O({type:r,selectors:[["app-connexion"]],standalone:!0,features:[F],decls:47,vars:21,consts:[["f","ngForm"],["emailField","ngModel"],["mdpField","ngModel"],[1,"auth-page"],[1,"auth-wrapper"],["routerLink","/",1,"auth-branding",2,"text-decoration","none"],[1,"auth-branding-icon"],[1,"bi","bi-heart-pulse-fill"],[1,"auth-branding-name"],[1,"auth-card"],[1,"auth-card-header"],[1,"auth-card-body"],["class","auth-alert",4,"ngIf"],[3,"ngSubmit"],[1,"auth-form-group"],["for","email"],[1,"auth-input-group"],[1,"bi","bi-envelope","auth-input-icon"],["id","email","type","email","name","email","required","","email","","autocomplete","email",1,"auth-input",3,"ngModelChange","placeholder","ngModel"],["class","auth-hint",4,"ngIf"],["for","motDePasse"],[1,"bi","bi-lock","auth-input-icon"],["id","motDePasse","name","motDePasse","required","","minlength","6","autocomplete","current-password",1,"auth-input",3,"ngModelChange","type","placeholder","ngModel"],["type","button",1,"auth-toggle-pw",3,"click"],[1,"bi",3,"ngClass"],[1,"auth-forgot-row"],["routerLink","/mot-de-passe-oublie",1,"auth-forgot-link"],["type","submit",1,"auth-submit",3,"disabled"],["class","auth-spinner",4,"ngIf"],[1,"auth-footer"],["routerLink","/inscription"],[1,"auth-footer",2,"margin-top","28px","font-size","0.72rem","opacity","0.5"],[1,"auth-alert"],[1,"bi","bi-exclamation-triangle-fill"],[1,"auth-hint"],[1,"auth-spinner"]],template:function(l,n){if(l&1){let m=I();e(0,"div",3)(1,"div",4)(2,"a",5)(3,"div",6),c(4,"i",7),i(),e(5,"div",8),o(6,"PharmaCare"),i()(),e(7,"div",9)(8,"div",10)(9,"h1"),o(10),i(),e(11,"p"),o(12),i()(),e(13,"div",11),x(14,J,4,1,"div",12),e(15,"form",13,0),y("ngSubmit",function(){h(m);let a=C(16);return f(n.onConnexion(a))}),e(17,"div",14)(18,"label",15),o(19),i(),e(20,"div",16),c(21,"i",17),e(22,"input",18,1),M("ngModelChange",function(a){return h(m),w(n.email,a)||(n.email=a),f(a)}),i()(),x(24,K,2,1,"div",19),i(),e(25,"div",14)(26,"label",20),o(27),i(),e(28,"div",16),c(29,"i",21),e(30,"input",22,2),M("ngModelChange",function(a){return h(m),w(n.motDePasse,a)||(n.motDePasse=a),f(a)}),i(),e(32,"button",23),y("click",function(){return h(m),f(n.showPassword=!n.showPassword)}),c(33,"i",24),i()(),x(34,Q,2,1,"div",19),i(),e(35,"div",25)(36,"a",26),o(37),i()(),e(38,"button",27),x(39,X,1,0,"span",28),o(40),i()()()(),e(41,"div",29),o(42),e(43,"a",30),o(44),i()(),e(45,"div",31),o(46),i()()()}if(l&2){let m=C(16),g=C(23),a=C(31);t(10),p(n.t.isFr?"Connexion":"Login"),t(2),p(n.t.isFr?"Accedez a votre espace personnel":"Access your personal space"),t(2),d("ngIf",n.erreur),t(5),p(n.t.isFr?"Adresse email":"Email address"),t(3),d("placeholder",n.t.isFr?"nom@exemple.com":"name@example.com"),P("ngModel",n.email),t(2),d("ngIf",g.touched&&g.invalid),t(3),p(n.t.isFr?"Mot de passe":"Password"),t(3),d("type",n.showPassword?"text":"password")("placeholder",n.t.isFr?"Votre mot de passe":"Your password"),P("ngModel",n.motDePasse),t(2),S("aria-label",n.showPassword?"Hide password":"Show password"),t(),d("ngClass",n.showPassword?"bi-eye-slash":"bi-eye"),t(),d("ngIf",a.touched&&a.invalid),t(3),u(" ",n.t.isFr?"Mot de passe oubli\xE9 ?":"Forgot password?"," "),t(),d("disabled",m.invalid||n.enCours),t(),d("ngIf",n.enCours),t(),u(" ",n.enCours?n.t.isFr?"Connexion...":"Signing in...":n.t.isFr?"Se connecter":"Sign in"," "),t(2),u(" ",n.t.isFr?"Nouveau client ?":"New customer?"," "),t(2),p(n.t.isFr?"Commencez ici":"Start here"),t(2),u(" \xA9 2026 PharmaCare \xB7 Conditions \xB7 ",n.t.isFr?"Confidentialit\xE9":"Privacy"," ")}},dependencies:[z,k,E,G,W,L,j,q,B,U,R,Y,A,N],styles:[`

      .auth-page[_ngcontent-%COMP%] {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        position: relative;
        overflow: hidden;
      }

      


      

      .auth-wrapper[_ngcontent-%COMP%] {
        width: 100%;
        max-width: 440px;
        animation: _ngcontent-%COMP%_authFadeIn .5s ease-out;
        position: relative;
        z-index: 1;
      }

      @keyframes _ngcontent-%COMP%_authFadeIn {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      

      .auth-branding[_ngcontent-%COMP%] {
        display: block;
        text-align: center;
        margin-bottom: 2rem;
        text-decoration: none;
      }

      .auth-branding-icon[_ngcontent-%COMP%] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: #fff;
        font-size: 1.5rem;
        margin-bottom: .75rem;
        box-shadow: 0 4px 16px rgba(78, 128, 238, .25);
      }

      .auth-branding-name[_ngcontent-%COMP%] {
        font-family: 'Inter', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: #fff;
        letter-spacing: -.3px;
        text-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }

      

      .auth-card[_ngcontent-%COMP%] {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 8px 32px rgba(0,0,0,.06);
      }

      .auth-card-header[_ngcontent-%COMP%] {
        padding: 1.5rem 2rem 1.25rem;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: #fff;
      }

      .auth-card-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
        font-family: 'Inter', sans-serif;
        font-size: 1.35rem;
        font-weight: 700;
        margin: 0 0 .25rem;
      }

      .auth-card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
        margin: 0;
        font-size: .875rem;
        opacity: .85;
      }

      .auth-card-body[_ngcontent-%COMP%] {
        padding: 2rem;
      }

      

      .auth-alert[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: .625rem;
        padding: .75rem 1rem;
        border-radius: 8px;
        background: rgba(220, 53, 69, .08);
        border: 1px solid rgba(220, 53, 69, .2);
        color: var(--danger, #dc3545);
        font-size: .875rem;
        margin-bottom: 1.25rem;
        animation: _ngcontent-%COMP%_authFadeIn .3s ease-out;
      }

      .auth-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      

      .auth-form-group[_ngcontent-%COMP%] {
        margin-bottom: 1.25rem;
      }

      .auth-form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
        display: block;
        font-family: 'Inter', sans-serif;
        font-size: .8125rem;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: .4rem;
        letter-spacing: .2px;
      }

      .auth-input-group[_ngcontent-%COMP%] {
        position: relative;
        display: flex;
        align-items: stretch;
      }

      .auth-input-icon[_ngcontent-%COMP%] {
        position: absolute;
        left: .875rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-secondary);
        font-size: 1rem;
        pointer-events: none;
        z-index: 2;
        opacity: .6;
        transition: opacity .2s, color .2s;
      }

      .auth-input-group[_ngcontent-%COMP%]:focus-within   .auth-input-icon[_ngcontent-%COMP%] {
        color: var(--primary);
        opacity: 1;
      }

      .auth-input[_ngcontent-%COMP%] {
        width: 100%;
        padding: .7rem .875rem .7rem 2.5rem;
        font-family: 'Inter', sans-serif;
        font-size: .9rem;
        color: var(--text-primary);
        background: var(--bg-main);
        border: 1px solid var(--border);
        border-radius: 8px;
        outline: none;
        transition: border-color .2s, box-shadow .2s;
      }

      .auth-input[_ngcontent-%COMP%]:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(78, 128, 238, .12);
      }

      .auth-input[_ngcontent-%COMP%]::placeholder {
        color: var(--text-secondary);
        opacity: .5;
      }

      .auth-input.ng-touched.ng-invalid[_ngcontent-%COMP%] {
        border-color: var(--danger, #dc3545);
      }

      .auth-input.ng-touched.ng-invalid[_ngcontent-%COMP%]:focus {
        box-shadow: 0 0 0 3px rgba(220, 53, 69, .12);
      }

      .auth-toggle-pw[_ngcontent-%COMP%] {
        position: absolute;
        right: .5rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-secondary);
        font-size: 1.05rem;
        padding: .25rem .375rem;
        border-radius: 6px;
        transition: color .2s, background .2s;
        z-index: 2;
      }

      .auth-toggle-pw[_ngcontent-%COMP%]:hover {
        color: var(--primary);
        background: rgba(78, 128, 238, .08);
      }

      

      .auth-forgot-row[_ngcontent-%COMP%] {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
      }

      .auth-forgot-link[_ngcontent-%COMP%] {
        font-family: 'Inter', sans-serif;
        font-size: .8125rem;
        font-weight: 500;
        color: var(--primary);
        text-decoration: none;
        transition: opacity .2s;
      }

      .auth-forgot-link[_ngcontent-%COMP%]:hover {
        opacity: .8;
        text-decoration: underline;
      }

      

      .auth-submit[_ngcontent-%COMP%] {
        width: 100%;
        padding: .75rem 1.5rem;
        font-family: 'Inter', sans-serif;
        font-size: .95rem;
        font-weight: 600;
        color: #fff;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        border: none;
        border-radius: 8px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        transition: transform .15s, box-shadow .2s, opacity .2s;
        box-shadow: 0 2px 8px rgba(78, 128, 238, .3);
      }

      .auth-submit[_ngcontent-%COMP%]:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(78, 128, 238, .4);
      }

      .auth-submit[_ngcontent-%COMP%]:active:not(:disabled) {
        transform: translateY(0);
      }

      .auth-submit[_ngcontent-%COMP%]:disabled {
        opacity: .65;
        cursor: not-allowed;
      }

      .auth-spinner[_ngcontent-%COMP%] {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255,255,255,.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: _ngcontent-%COMP%_authSpin .6s linear infinite;
      }

      @keyframes _ngcontent-%COMP%_authSpin {
        to { transform: rotate(360deg); }
      }

      

      .auth-footer[_ngcontent-%COMP%] {
        text-align: center;
        margin-top: 1.75rem;
        font-family: 'Inter', sans-serif;
        font-size: .875rem;
        color: rgba(255,255,255,0.75);
      }

      .auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
        color: #fff;
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: opacity .2s;
      }

      .auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
        opacity: .8;
      }

      

      .auth-hint[_ngcontent-%COMP%] {
        font-size: .75rem;
        color: var(--danger, #dc3545);
        margin-top: .3rem;
        padding-left: .125rem;
      }

      

      @media (max-width: 480px) {
        .auth-card-body[_ngcontent-%COMP%] {
          padding: 1.5rem 1.25rem;
        }
        .auth-card-header[_ngcontent-%COMP%] {
          padding: 1.25rem 1.25rem 1rem;
        }
      }`]})}}return r})();export{dn as ConnexionComponent};
