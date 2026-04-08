import{a as k}from"./chunk-3AMDDGQS.js";import"./chunk-X2FWJVGO.js";import{b as F,c as z,d as D,e as V,f as T,g as N,p as L,q as j,u as Y}from"./chunk-JFFEVNN4.js";import{a as q}from"./chunk-KLBCIYXG.js";import"./chunk-G23MBNRK.js";import{e as E}from"./chunk-7JCHU7QU.js";import{Db as S,Fa as g,Ha as l,Jb as I,La as t,Ma as o,Na as d,Qa as C,Ra as M,Sa as c,W as v,Xa as f,Ya as s,Za as m,_a as h,ba as b,ca as x,cb as y,db as P,eb as O,gb as w,qa as a,ra as _}from"./chunk-WLCN34OF.js";function A(e,u){if(e&1&&(t(0,"div",17),d(1,"i",18),t(2,"span"),s(3),o()()),e&2){let i=c();a(3),m(i.erreur)}}function B(e,u){if(e&1&&(t(0,"div",19),d(1,"i",20),t(2,"span"),s(3),o()()),e&2){let i=c();a(3),m(i.t.isFr?"Si l'email existe, un lien de r\xE9initialisation a \xE9t\xE9 envoy\xE9.":"If the email exists, a reset link has been sent.")}}function R(e,u){if(e&1&&(t(0,"div",30),s(1),o()),e&2){let i=c(2);a(),h(" ",i.t.isFr?"Veuillez entrer un email valide.":"Please enter a valid email."," ")}}function W(e,u){e&1&&d(0,"span",31)}function G(e,u){if(e&1){let i=C();t(0,"form",21,0),M("ngSubmit",function(){b(i);let n=f(1),p=c();return x(p.onSubmit(n))}),t(2,"div",22)(3,"label",23),s(4),o(),t(5,"div",24),d(6,"i",25),t(7,"input",26,1),O("ngModelChange",function(n){b(i);let p=c();return P(p.email,n)||(p.email=n),x(n)}),o()(),g(9,R,2,1,"div",27),o(),t(10,"button",28),g(11,W,1,0,"span",29),s(12),o()()}if(e&2){let i=f(1),r=f(8),n=c();a(4),m(n.t.isFr?"Adresse email":"Email address"),a(3),l("placeholder",n.t.isFr?"nom@exemple.com":"name@example.com"),y("ngModel",n.email),a(2),l("ngIf",r.touched&&r.invalid),a(),l("disabled",i.invalid||n.enCours),a(),l("ngIf",n.enCours),a(),h(" ",n.enCours?n.t.isFr?"Envoi en cours...":"Sending...":n.t.isFr?"Envoyer le lien":"Send reset link"," ")}}var nn=(()=>{class e{constructor(i,r){this.t=i,this.authService=r,this.email="",this.enCours=!1,this.erreur="",this.succes=!1}onSubmit(i){i.invalid||(this.erreur="",this.enCours=!0,this.authService.motDePasseOublie(this.email).subscribe({next:r=>{this.enCours=!1,this.succes=!0,r.resetLink&&(window.location.href=r.resetLink)},error:r=>{this.enCours=!1,r.status===0?this.erreur=this.t.isFr?"Impossible de contacter le serveur. V\xE9rifiez que le service est d\xE9marr\xE9.":"Cannot reach the server. Please check that the service is running.":this.succes=!0}}))}static{this.\u0275fac=function(r){return new(r||e)(_(q),_(k))}}static{this.\u0275cmp=v({type:e,selectors:[["app-mot-de-passe-oublie"]],standalone:!0,features:[w],decls:21,vars:6,consts:[["f","ngForm"],["emailField","ngModel"],[1,"auth-page"],[1,"auth-wrapper"],["routerLink","/",1,"auth-branding",2,"text-decoration","none"],[1,"auth-branding-icon"],[1,"bi","bi-heart-pulse-fill"],[1,"auth-branding-name"],[1,"auth-card"],[1,"auth-card-header"],[1,"auth-card-body"],["class","auth-alert error",4,"ngIf"],["class","auth-alert success",4,"ngIf"],[3,"ngSubmit",4,"ngIf"],[1,"auth-footer"],["routerLink","/connexion"],[1,"bi","bi-arrow-left",2,"margin-right","4px"],[1,"auth-alert","error"],[1,"bi","bi-exclamation-triangle-fill"],[1,"auth-alert","success"],[1,"bi","bi-check-circle-fill"],[3,"ngSubmit"],[1,"auth-form-group"],["for","email"],[1,"auth-input-group"],[1,"bi","bi-envelope","auth-input-icon"],["id","email","type","email","name","email","required","","email","","autocomplete","email",1,"auth-input",3,"ngModelChange","placeholder","ngModel"],["class","auth-hint",4,"ngIf"],["type","submit",1,"auth-submit",3,"disabled"],["class","auth-spinner",4,"ngIf"],[1,"auth-hint"],[1,"auth-spinner"]],template:function(r,n){r&1&&(t(0,"div",2)(1,"div",3)(2,"a",4)(3,"div",5),d(4,"i",6),o(),t(5,"div",7),s(6,"PharmaCare"),o()(),t(7,"div",8)(8,"div",9)(9,"h1"),s(10),o(),t(11,"p"),s(12),o()(),t(13,"div",10),g(14,A,4,1,"div",11)(15,B,4,1,"div",12)(16,G,13,7,"form",13),o()(),t(17,"div",14)(18,"a",15),d(19,"i",16),s(20),o()()()()),r&2&&(a(10),m(n.t.isFr?"Mot de passe oubli\xE9":"Forgot Password"),a(2),m(n.t.isFr?"Entrez votre email pour recevoir un lien de r\xE9initialisation":"Enter your email to receive a reset link"),a(2),l("ngIf",n.erreur),a(),l("ngIf",n.succes),a(),l("ngIf",!n.succes),a(4),h(" ",n.t.isFr?"Retour \xE0 la connexion":"Back to login"," "))},dependencies:[I,S,Y,N,F,z,D,L,j,T,V,E],styles:[`.auth-page[_ngcontent-%COMP%] {
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
        text-align: center;
        margin-bottom: 2rem;
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
        color: var(--text-primary);
        letter-spacing: -.3px;
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
        font-size: .875rem;
        margin-bottom: 1.25rem;
        animation: _ngcontent-%COMP%_authFadeIn .3s ease-out;
      }

      .auth-alert.error[_ngcontent-%COMP%] {
        background: rgba(220, 53, 69, .08);
        border: 1px solid rgba(220, 53, 69, .2);
        color: var(--danger, #dc3545);
      }

      .auth-alert.success[_ngcontent-%COMP%] {
        background: rgba(16, 185, 129, .08);
        border: 1px solid rgba(16, 185, 129, .2);
        color: var(--success, #10B981);
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

      .auth-hint[_ngcontent-%COMP%] {
        font-size: .75rem;
        color: var(--danger, #dc3545);
        margin-top: .3rem;
        padding-left: .125rem;
      }

      .auth-footer[_ngcontent-%COMP%] {
        text-align: center;
        margin-top: 1.75rem;
        font-family: 'Inter', sans-serif;
        font-size: .875rem;
      }

      .auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
        font-weight: 600;
        text-decoration: none;
        transition: opacity .2s;
      }

      .auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
        opacity: .8;
        text-decoration: underline;
      }

      @media (max-width: 480px) {
        .auth-card-body[_ngcontent-%COMP%] {
          padding: 1.5rem 1.25rem;
        }
        .auth-card-header[_ngcontent-%COMP%] {
          padding: 1.25rem 1.25rem 1rem;
        }
      }`]})}}return e})();export{nn as MotDePasseOublieComponent};
