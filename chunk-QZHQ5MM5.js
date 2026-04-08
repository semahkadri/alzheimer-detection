import{a as R}from"./chunk-3AMDDGQS.js";import"./chunk-X2FWJVGO.js";import{b as z,c as T,d as V,e as L,f as N,g as B,p as W,r as Y,u as j}from"./chunk-JFFEVNN4.js";import{a as q}from"./chunk-KLBCIYXG.js";import"./chunk-G23MBNRK.js";import{b as I,e as F}from"./chunk-7JCHU7QU.js";import{Bb as k,Db as D,Fa as x,Ga as w,Ha as d,Jb as E,La as r,Ma as s,Na as u,Qa as O,Ra as v,Sa as l,W as y,Xa as _,Ya as c,Za as m,_a as g,ba as h,ca as f,cb as P,db as C,eb as M,gb as S,qa as t,ra as b}from"./chunk-WLCN34OF.js";function A(o,p){if(o&1&&(r(0,"div",18),u(1,"i",19),r(2,"span"),c(3),s()()),o&2){let e=l();t(3),m(e.t.isFr?"Le lien de r\xE9initialisation est invalide ou expir\xE9.":"The reset link is invalid or expired.")}}function H(o,p){if(o&1&&(r(0,"div",18),u(1,"i",19),r(2,"span"),c(3),s()()),o&2){let e=l();t(3),m(e.erreur)}}function Z(o,p){if(o&1&&(r(0,"div")(1,"div",20),u(2,"i",21),r(3,"span"),c(4),s()(),r(5,"a",22),c(6),s()()),o&2){let e=l();t(4),m(e.t.isFr?"Votre mot de passe a \xE9t\xE9 r\xE9initialis\xE9 avec succ\xE8s.":"Your password has been reset successfully."),t(2),g(" ",e.t.isFr?"Se connecter":"Sign in"," ")}}function G(o,p){if(o&1&&(r(0,"div",38),c(1),s()),o&2){let e=l(2);t(),g(" ",e.t.isFr?"Le mot de passe doit contenir au moins 8 caract\xE8res.":"Password must be at least 8 characters."," ")}}function J(o,p){if(o&1&&(r(0,"div",39)(1,"div",40),u(2,"div",41),s(),r(3,"span",42),c(4),s()()),o&2){let e=l(2);t(2),d("ngClass",e.getPasswordStrength()),t(),d("ngClass",e.getPasswordStrength()),t(),g(" ",e.getPasswordStrengthLabel()," ")}}function K(o,p){if(o&1&&(r(0,"div",38),c(1),s()),o&2){let e=l(2);t(),g(" ",e.t.isFr?"Les mots de passe ne correspondent pas.":"Passwords do not match."," ")}}function Q(o,p){o&1&&u(0,"span",43)}function U(o,p){if(o&1){let e=O();r(0,"form",23,0),v("ngSubmit",function(){h(e);let i=_(1),n=l();return f(n.onSubmit(i))}),r(2,"div",24)(3,"label",25),c(4),s(),r(5,"div",26),u(6,"i",27),r(7,"input",28,1),M("ngModelChange",function(i){h(e);let n=l();return C(n.nouveauMotDePasse,i)||(n.nouveauMotDePasse=i),f(i)}),s(),r(9,"button",29),v("click",function(){h(e);let i=l();return f(i.showPassword=!i.showPassword)}),u(10,"i",30),s()(),x(11,G,2,1,"div",31)(12,J,5,3,"div",32),s(),r(13,"div",24)(14,"label",33),c(15),s(),r(16,"div",26),u(17,"i",34),r(18,"input",35,2),M("ngModelChange",function(i){h(e);let n=l();return C(n.confirmMotDePasse,i)||(n.confirmMotDePasse=i),f(i)}),s(),r(20,"button",29),v("click",function(){h(e);let i=l();return f(i.showConfirmPassword=!i.showConfirmPassword)}),u(21,"i",30),s()(),x(22,K,2,1,"div",31),s(),r(23,"button",36),x(24,Q,1,0,"span",37),c(25),s()()}if(o&2){let e=_(1),a=_(8),i=_(19),n=l();t(4),m(n.t.isFr?"Nouveau mot de passe":"New password"),t(3),d("type",n.showPassword?"text":"password")("placeholder",n.t.isFr?"Minimum 8 caract\xE8res":"Minimum 8 characters"),P("ngModel",n.nouveauMotDePasse),t(2),w("aria-label",n.showPassword?"Hide password":"Show password"),t(),d("ngClass",n.showPassword?"bi-eye-slash":"bi-eye"),t(),d("ngIf",a.touched&&a.invalid),t(),d("ngIf",n.nouveauMotDePasse),t(3),m(n.t.isFr?"Confirmer le mot de passe":"Confirm password"),t(3),d("type",n.showConfirmPassword?"text":"password")("placeholder",n.t.isFr?"Retapez le mot de passe":"Re-enter your password"),P("ngModel",n.confirmMotDePasse),t(2),w("aria-label",n.showConfirmPassword?"Hide password":"Show password"),t(),d("ngClass",n.showConfirmPassword?"bi-eye-slash":"bi-eye"),t(),d("ngIf",i.touched&&n.confirmMotDePasse&&n.nouveauMotDePasse!==n.confirmMotDePasse),t(),d("disabled",e.invalid||n.enCours||n.nouveauMotDePasse!==n.confirmMotDePasse),t(),d("ngIf",n.enCours),t(),g(" ",n.enCours?n.t.isFr?"R\xE9initialisation...":"Resetting...":n.t.isFr?"R\xE9initialiser":"Reset password"," ")}}var se=(()=>{class o{constructor(e,a,i){this.t=e,this.authService=a,this.route=i,this.token="",this.nouveauMotDePasse="",this.confirmMotDePasse="",this.showPassword=!1,this.showConfirmPassword=!1,this.enCours=!1,this.erreur="",this.succes=!1}ngOnInit(){this.token=this.route.snapshot.queryParamMap.get("token")||""}getPasswordStrength(){let e=this.nouveauMotDePasse;if(!e)return"weak";let a=0;return e.length>=8&&a++,e.length>=12&&a++,/[A-Z]/.test(e)&&a++,/[a-z]/.test(e)&&a++,/[0-9]/.test(e)&&a++,/[^A-Za-z0-9]/.test(e)&&a++,a>=5?"strong":a>=3?"medium":"weak"}getPasswordStrengthLabel(){let e=this.getPasswordStrength();return this.t.isFr?e==="strong"?"Fort":e==="medium"?"Moyen":"Faible":e==="strong"?"Strong":e==="medium"?"Medium":"Weak"}onSubmit(e){if(!e.invalid){if(this.nouveauMotDePasse!==this.confirmMotDePasse){this.erreur=this.t.isFr?"Les mots de passe ne correspondent pas.":"Passwords do not match.";return}this.erreur="",this.enCours=!0,this.authService.resetMotDePasse(this.token,this.nouveauMotDePasse).subscribe({next:()=>{this.enCours=!1,this.succes=!0},error:a=>{this.enCours=!1,a.status===0?this.erreur=this.t.isFr?"Impossible de contacter le serveur. V\xE9rifiez que le service est d\xE9marr\xE9.":"Cannot reach the server. Please check that the service is running.":this.erreur=a?.error?.message||(this.t.isFr?"Le lien de r\xE9initialisation est invalide ou expir\xE9.":"The reset link is invalid or expired.")}})}}static{this.\u0275fac=function(a){return new(a||o)(b(q),b(R),b(I))}}static{this.\u0275cmp=y({type:o,selectors:[["app-reset-mot-de-passe"]],standalone:!0,features:[S],decls:22,vars:7,consts:[["f","ngForm"],["mdpField","ngModel"],["confirmField","ngModel"],[1,"auth-page"],[1,"auth-wrapper"],["routerLink","/",1,"auth-branding",2,"text-decoration","none"],[1,"auth-branding-icon"],[1,"bi","bi-heart-pulse-fill"],[1,"auth-branding-name"],[1,"auth-card"],[1,"auth-card-header"],[1,"auth-card-body"],["class","auth-alert error",4,"ngIf"],[4,"ngIf"],[3,"ngSubmit",4,"ngIf"],[1,"auth-footer"],["routerLink","/connexion"],[1,"bi","bi-arrow-left",2,"margin-right","4px"],[1,"auth-alert","error"],[1,"bi","bi-exclamation-triangle-fill"],[1,"auth-alert","success"],[1,"bi","bi-check-circle-fill"],["routerLink","/connexion",1,"auth-submit",2,"text-decoration","none","text-align","center"],[3,"ngSubmit"],[1,"auth-form-group"],["for","nouveauMotDePasse"],[1,"auth-input-group"],[1,"bi","bi-lock","auth-input-icon"],["id","nouveauMotDePasse","name","nouveauMotDePasse","required","","minlength","8","autocomplete","new-password",1,"auth-input",2,"padding-right","2.5rem",3,"ngModelChange","type","placeholder","ngModel"],["type","button",1,"auth-toggle-pw",3,"click"],[1,"bi",3,"ngClass"],["class","auth-hint",4,"ngIf"],["class","auth-pwd-strength",4,"ngIf"],["for","confirmMotDePasse"],[1,"bi","bi-shield-lock","auth-input-icon"],["id","confirmMotDePasse","name","confirmMotDePasse","required","","autocomplete","new-password",1,"auth-input",2,"padding-right","2.5rem",3,"ngModelChange","type","placeholder","ngModel"],["type","submit",1,"auth-submit",3,"disabled"],["class","auth-spinner",4,"ngIf"],[1,"auth-hint"],[1,"auth-pwd-strength"],[1,"auth-pwd-bar-track"],[1,"auth-pwd-bar-fill",3,"ngClass"],[1,"auth-pwd-label",3,"ngClass"],[1,"auth-spinner"]],template:function(a,i){a&1&&(r(0,"div",3)(1,"div",4)(2,"a",5)(3,"div",6),u(4,"i",7),s(),r(5,"div",8),c(6,"PharmaCare"),s()(),r(7,"div",9)(8,"div",10)(9,"h1"),c(10),s(),r(11,"p"),c(12),s()(),r(13,"div",11),x(14,A,4,1,"div",12)(15,H,4,1,"div",12)(16,Z,7,2,"div",13)(17,U,26,18,"form",14),s()(),r(18,"div",15)(19,"a",16),u(20,"i",17),c(21),s()()()()),a&2&&(t(10),m(i.t.isFr?"Nouveau mot de passe":"New Password"),t(2),m(i.t.isFr?"Choisissez un nouveau mot de passe s\xE9curis\xE9":"Choose a new secure password"),t(2),d("ngIf",!i.token),t(),d("ngIf",i.erreur),t(),d("ngIf",i.succes),t(),d("ngIf",i.token&&!i.succes),t(4),g(" ",i.t.isFr?"Retour \xE0 la connexion":"Back to login"," "))},dependencies:[E,k,D,j,B,z,T,V,W,Y,N,L,F],styles:[`.auth-page[_ngcontent-%COMP%] {
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

      

      .auth-pwd-strength[_ngcontent-%COMP%] {
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .auth-pwd-bar-track[_ngcontent-%COMP%] {
        flex: 1;
        height: 4px;
        border-radius: 4px;
        background: var(--border, #E2E8F0);
        overflow: hidden;
      }

      .auth-pwd-bar-fill[_ngcontent-%COMP%] {
        height: 100%;
        border-radius: 4px;
        transition: width 0.35s ease, background 0.35s ease;
      }

      .auth-pwd-bar-fill.weak[_ngcontent-%COMP%] {
        width: 33%;
        background: var(--danger, #EF4444);
      }

      .auth-pwd-bar-fill.medium[_ngcontent-%COMP%] {
        width: 66%;
        background: #F59E0B;
      }

      .auth-pwd-bar-fill.strong[_ngcontent-%COMP%] {
        width: 100%;
        background: var(--success, #10B981);
      }

      .auth-pwd-label[_ngcontent-%COMP%] {
        font-size: 11.5px;
        font-weight: 600;
        min-width: 56px;
        text-align: right;
      }

      .auth-pwd-label.weak[_ngcontent-%COMP%]   { color: var(--danger, #EF4444); }
      .auth-pwd-label.medium[_ngcontent-%COMP%] { color: #F59E0B; }
      .auth-pwd-label.strong[_ngcontent-%COMP%] { color: var(--success, #10B981); }

      @media (max-width: 480px) {
        .auth-card-body[_ngcontent-%COMP%] {
          padding: 1.5rem 1.25rem;
        }
        .auth-card-header[_ngcontent-%COMP%] {
          padding: 1.25rem 1.25rem 1rem;
        }
      }`]})}}return o})();export{se as ResetMotDePasseComponent};
