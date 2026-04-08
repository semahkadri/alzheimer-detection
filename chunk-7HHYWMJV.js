import{a as L}from"./chunk-3AMDDGQS.js";import"./chunk-X2FWJVGO.js";import{b as W,c as B,d as A,e as N,f as q,g as j,p as R,q as Y,r as U,u as J}from"./chunk-JFFEVNN4.js";import{a as Z}from"./chunk-KLBCIYXG.js";import"./chunk-G23MBNRK.js";import{d as z,e as D}from"./chunk-7JCHU7QU.js";import{Bb as k,Db as V,Fa as _,Ha as d,Jb as T,La as t,Ma as r,Na as p,Qa as F,Ra as M,Sa as g,W as I,Xa as C,Ya as l,Za as f,_a as m,ba as b,ca as x,cb as v,db as w,eb as y,gb as O,qa as e,ra as P}from"./chunk-WLCN34OF.js";function H(o,h){if(o&1&&(t(0,"div",39),p(1,"i",40),t(2,"span"),l(3),r()()),o&2){let i=g();e(3),f(i.erreur)}}function K(o,h){if(o&1&&(t(0,"div",41),l(1),r()),o&2){let i=g();e(),m(" ",i.t.isFr?"Le nom doit contenir au moins 2 caract\xE8res":"Last name must be at least 2 characters"," ")}}function Q(o,h){if(o&1&&(t(0,"div",41),l(1),r()),o&2){let i=g();e(),m(" ",i.t.isFr?"Le pr\xE9nom doit contenir au moins 2 caract\xE8res":"First name must be at least 2 characters"," ")}}function X(o,h){if(o&1&&(t(0,"div",41),l(1),r()),o&2){let i=g();e(),m(" ",i.t.isFr?"Veuillez entrer un email valide":"Please enter a valid email"," ")}}function $(o,h){if(o&1&&(t(0,"div",41),l(1),r()),o&2){let i=g();e(),m(" ",i.t.isFr?"Le mot de passe doit contenir au moins 8 caract\xE8res":"Password must be at least 8 characters"," ")}}function nn(o,h){if(o&1&&(t(0,"div",42)(1,"div",43),p(2,"div",44),r(),t(3,"span",45),l(4),r()()),o&2){let i=g();e(2),d("ngClass",i.getPasswordStrength()),e(),d("ngClass",i.getPasswordStrength()),e(),m(" ",i.getPasswordStrengthLabel()," ")}}function en(o,h){if(o&1&&(t(0,"div",41),l(1),r()),o&2){let i=g();e(),m(" ",i.t.isFr?"Les mots de passe ne correspondent pas":"Passwords do not match"," ")}}function tn(o,h){o&1&&p(0,"span",46)}function rn(o,h){if(o&1&&(t(0,"span"),p(1,"i",47),l(2),r()),o&2){let i=g();e(2),m(" ",i.t.isFr?"S'inscrire":"Sign up"," ")}}function on(o,h){if(o&1&&(t(0,"span"),l(1),r()),o&2){let i=g();e(),m(" ",i.t.isFr?"Inscription en cours...":"Signing up..."," ")}}var fn=(()=>{class o{constructor(i,a,n){this.authService=i,this.router=a,this.t=n,this.form={nom:"",prenom:"",email:"",motDePasse:"",confirmationMotDePasse:""},this.showPassword=!1,this.showConfirmPassword=!1,this.enCours=!1,this.erreur=""}getPasswordStrength(){let i=this.form.motDePasse;if(!i)return"weak";let a=0;return i.length>=8&&a++,i.length>=12&&a++,/[A-Z]/.test(i)&&a++,/[a-z]/.test(i)&&a++,/[0-9]/.test(i)&&a++,/[^A-Za-z0-9]/.test(i)&&a++,a>=5?"strong":a>=3?"medium":"weak"}getPasswordStrengthLabel(){let i=this.getPasswordStrength();return this.t.isFr?i==="strong"?"Fort":i==="medium"?"Moyen":"Faible":i==="strong"?"Strong":i==="medium"?"Medium":"Weak"}onSubmit(i){if(!i.invalid){if(this.form.motDePasse!==this.form.confirmationMotDePasse){this.erreur=this.t.isFr?"Les mots de passe ne correspondent pas":"Passwords do not match";return}this.enCours=!0,this.erreur="",this.authService.inscription(this.form).subscribe({next:a=>{if(a.autoVerified&&a.accessToken){localStorage.setItem("accessToken",a.accessToken),localStorage.setItem("refreshToken",a.refreshToken),localStorage.setItem("utilisateur",JSON.stringify({email:a.email,nom:this.form.nom,prenom:this.form.prenom,role:"UTILISATEUR"})),this.router.navigate(["/"]);return}this.router.navigate(["/verifier-email"],{queryParams:{email:a.email}})},error:a=>{this.enCours=!1,a.status===0?this.erreur=this.t.isFr?"Service temporairement indisponible. Veuillez r\xE9essayer dans quelques instants.":"Service temporarily unavailable. Please try again shortly.":this.erreur=a.error?.message||(this.t.isFr?"Une erreur est survenue lors de l'inscription.":"An error occurred during registration.")}})}}static{this.\u0275fac=function(a){return new(a||o)(P(L),P(z),P(Z))}}static{this.\u0275cmp=I({type:o,selectors:[["app-inscription"]],standalone:!0,features:[O],decls:72,vars:35,consts:[["inscriptionForm","ngForm"],["nomField","ngModel"],["prenomField","ngModel"],["emailField","ngModel"],["mdpField","ngModel"],["confirmField","ngModel"],[1,"auth-page"],[1,"auth-container"],["routerLink","/",1,"auth-brand",2,"text-decoration","none","display","block"],[1,"auth-brand-icon"],[1,"bi","bi-heart-pulse-fill"],[1,"auth-brand-name"],[1,"auth-card"],[1,"auth-card-header"],[1,"auth-card-body"],["class","auth-error",4,"ngIf"],[3,"ngSubmit"],[1,"auth-form-group"],[1,"auth-input-group"],[1,"bi","bi-person","auth-input-icon"],["type","text","name","nom","required","","minlength","2",3,"ngModelChange","ngModel","placeholder"],["class","auth-field-hint",4,"ngIf"],[1,"bi","bi-person-badge","auth-input-icon"],["type","text","name","prenom","required","","minlength","2",3,"ngModelChange","ngModel","placeholder"],[1,"bi","bi-envelope","auth-input-icon"],["type","email","name","email","required","","email","",3,"ngModelChange","ngModel","placeholder"],[1,"bi","bi-lock","auth-input-icon"],["name","motDePasse","required","","minlength","8",2,"padding-right","42px",3,"ngModelChange","type","ngModel","placeholder"],["type","button",1,"auth-toggle-pwd",3,"click"],[1,"bi",3,"ngClass"],["class","auth-pwd-strength",4,"ngIf"],[1,"bi","bi-shield-lock","auth-input-icon"],["name","confirmationMotDePasse","required","",2,"padding-right","42px",3,"ngModelChange","type","ngModel","placeholder"],["type","submit",1,"auth-submit-btn",3,"disabled"],["class","auth-spinner",4,"ngIf"],[4,"ngIf"],[1,"auth-footer"],["routerLink","/connexion"],[1,"auth-footer",2,"margin-top","28px","font-size","0.72rem","opacity","0.5"],[1,"auth-error"],[1,"bi","bi-exclamation-triangle-fill"],[1,"auth-field-hint"],[1,"auth-pwd-strength"],[1,"auth-pwd-bar-track"],[1,"auth-pwd-bar-fill",3,"ngClass"],[1,"auth-pwd-label",3,"ngClass"],[1,"auth-spinner"],[1,"bi","bi-person-plus-fill",2,"margin-right","6px"]],template:function(a,n){if(a&1){let c=F();t(0,"div",6)(1,"div",7)(2,"a",8)(3,"div",9),p(4,"i",10),r(),t(5,"span",11),l(6,"PharmaCare"),r()(),t(7,"div",12)(8,"div",13)(9,"h2"),l(10),r(),t(11,"p"),l(12),r()(),t(13,"div",14),_(14,H,4,1,"div",15),t(15,"form",16,0),M("ngSubmit",function(){b(c);let s=C(16);return x(n.onSubmit(s))}),t(17,"div",17)(18,"label"),l(19),r(),t(20,"div",18),p(21,"i",19),t(22,"input",20,1),y("ngModelChange",function(s){return b(c),w(n.form.nom,s)||(n.form.nom=s),x(s)}),r()(),_(24,K,2,1,"div",21),r(),t(25,"div",17)(26,"label"),l(27),r(),t(28,"div",18),p(29,"i",22),t(30,"input",23,2),y("ngModelChange",function(s){return b(c),w(n.form.prenom,s)||(n.form.prenom=s),x(s)}),r()(),_(32,Q,2,1,"div",21),r(),t(33,"div",17)(34,"label"),l(35),r(),t(36,"div",18),p(37,"i",24),t(38,"input",25,3),y("ngModelChange",function(s){return b(c),w(n.form.email,s)||(n.form.email=s),x(s)}),r()(),_(40,X,2,1,"div",21),r(),t(41,"div",17)(42,"label"),l(43),r(),t(44,"div",18),p(45,"i",26),t(46,"input",27,4),y("ngModelChange",function(s){return b(c),w(n.form.motDePasse,s)||(n.form.motDePasse=s),x(s)}),r(),t(48,"button",28),M("click",function(){return b(c),x(n.showPassword=!n.showPassword)}),p(49,"i",29),r()(),_(50,$,2,1,"div",21)(51,nn,5,3,"div",30),r(),t(52,"div",17)(53,"label"),l(54),r(),t(55,"div",18),p(56,"i",31),t(57,"input",32,5),y("ngModelChange",function(s){return b(c),w(n.form.confirmationMotDePasse,s)||(n.form.confirmationMotDePasse=s),x(s)}),r(),t(59,"button",28),M("click",function(){return b(c),x(n.showConfirmPassword=!n.showConfirmPassword)}),p(60,"i",29),r()(),_(61,en,2,1,"div",21),r(),t(62,"button",33),_(63,tn,1,0,"span",34)(64,rn,3,1,"span",35)(65,on,2,1,"span",35),r()()()(),t(66,"div",36),l(67),t(68,"a",37),l(69),r()(),t(70,"div",38),l(71),r()()()}if(a&2){let c=C(16),u=C(23),s=C(31),E=C(39),S=C(47),G=C(58);e(10),f(n.t.isFr?"Cr\xE9er un compte":"Create Account"),e(2),f(n.t.isFr?"Rejoignez PharmaCare":"Join PharmaCare today"),e(2),d("ngIf",n.erreur),e(5),f(n.t.isFr?"Nom":"Last name"),e(3),v("ngModel",n.form.nom),d("placeholder",n.t.isFr?"Votre nom":"Your last name"),e(2),d("ngIf",u.touched&&u.invalid),e(3),f(n.t.isFr?"Pr\xE9nom":"First name"),e(3),v("ngModel",n.form.prenom),d("placeholder",n.t.isFr?"Votre pr\xE9nom":"Your first name"),e(2),d("ngIf",s.touched&&s.invalid),e(3),f(n.t.isFr?"Adresse email":"Email address"),e(3),v("ngModel",n.form.email),d("placeholder",n.t.isFr?"exemple@email.com":"example@email.com"),e(2),d("ngIf",E.touched&&E.invalid),e(3),f(n.t.isFr?"Mot de passe":"Password"),e(3),d("type",n.showPassword?"text":"password"),v("ngModel",n.form.motDePasse),d("placeholder",n.t.isFr?"Minimum 8 caract\xE8res":"Minimum 8 characters"),e(3),d("ngClass",n.showPassword?"bi-eye-slash":"bi-eye"),e(),d("ngIf",S.touched&&S.invalid),e(),d("ngIf",n.form.motDePasse),e(3),f(n.t.isFr?"Confirmer le mot de passe":"Confirm password"),e(3),d("type",n.showConfirmPassword?"text":"password"),v("ngModel",n.form.confirmationMotDePasse),d("placeholder",n.t.isFr?"Retapez le mot de passe":"Re-enter your password"),e(3),d("ngClass",n.showConfirmPassword?"bi-eye-slash":"bi-eye"),e(),d("ngIf",G.touched&&n.form.confirmationMotDePasse&&n.form.motDePasse!==n.form.confirmationMotDePasse),e(),d("disabled",n.enCours||c.invalid||n.form.motDePasse!==n.form.confirmationMotDePasse),e(),d("ngIf",n.enCours),e(),d("ngIf",!n.enCours),e(),d("ngIf",n.enCours),e(2),m(" ",n.t.isFr?"Vous avez un compte ?":"Already have an account?"," "),e(2),f(n.t.isFr?"Connectez-vous":"Sign in"),e(2),m(" \xA9 2026 PharmaCare \xB7 Conditions \xB7 ",n.t.isFr?"Confidentialit\xE9":"Privacy"," ")}},dependencies:[T,k,V,J,j,W,B,A,R,U,Y,q,N,D],styles:[`

      .auth-page[_ngcontent-%COMP%] {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 16px;
        font-family: 'Inter', sans-serif;
        animation: _ngcontent-%COMP%_authFadeIn 0.5s ease-out;
      }

      @keyframes _ngcontent-%COMP%_authFadeIn {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .auth-container[_ngcontent-%COMP%] {
        width: 100%;
        max-width: 480px;
      }

      

      .auth-brand[_ngcontent-%COMP%] {
        display: block;
        text-align: center;
        margin-bottom: 28px;
        text-decoration: none;
      }

      .auth-brand-icon[_ngcontent-%COMP%] {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        background: linear-gradient(135deg, var(--primary, #4E80EE), var(--primary-dark, #3A66CC));
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 24px;
        margin-bottom: 12px;
        box-shadow: 0 8px 24px rgba(78, 128, 238, 0.3);
      }

      .auth-brand-name[_ngcontent-%COMP%] {
        display: block;
        font-size: 22px;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 2px 8px rgba(0,0,0,0.15);
        letter-spacing: -0.3px;
      }

      

      .auth-card[_ngcontent-%COMP%] {
        background: var(--bg-card, #fff);
        border-radius: 12px;
        border: 1px solid var(--border, #E2E8F0);
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      }

      .auth-card-header[_ngcontent-%COMP%] {
        background: linear-gradient(135deg, var(--primary, #4E80EE), var(--primary-dark, #3A66CC));
        padding: 24px 28px;
        text-align: center;
      }

      .auth-card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
        margin: 0;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.2px;
      }

      .auth-card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
        margin: 6px 0 0;
        color: rgba(255,255,255,0.82);
        font-size: 13.5px;
      }

      .auth-card-body[_ngcontent-%COMP%] {
        padding: 28px;
      }

      

      .auth-form-group[_ngcontent-%COMP%] {
        margin-bottom: 18px;
      }

      .auth-form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: var(--text-secondary, #64748B);
        margin-bottom: 6px;
      }

      .auth-input-group[_ngcontent-%COMP%] {
        position: relative;
        display: flex;
        align-items: center;
      }

      .auth-input-icon[_ngcontent-%COMP%] {
        position: absolute;
        left: 14px;
        color: var(--text-secondary, #64748B);
        font-size: 16px;
        z-index: 1;
        pointer-events: none;
        transition: color 0.2s;
      }

      .auth-input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
        width: 100%;
        padding: 11px 14px 11px 42px;
        border: 1.5px solid var(--border, #E2E8F0);
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        color: var(--text-primary, #1E293B);
        background: var(--bg-main, #F8FAFC);
        transition: border-color 0.2s, box-shadow 0.2s;
        outline: none;
        box-sizing: border-box;
      }

      .auth-input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {
        border-color: var(--primary, #4E80EE);
        box-shadow: 0 0 0 3px rgba(78, 128, 238, 0.12);
        background: var(--bg-card, #fff);
      }

      .auth-input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus    ~ .auth-input-icon[_ngcontent-%COMP%], .auth-input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus    + .auth-input-icon[_ngcontent-%COMP%] {
        color: var(--primary, #4E80EE);
      }

      .auth-input-group[_ngcontent-%COMP%]   input.ng-touched.ng-invalid[_ngcontent-%COMP%] {
        border-color: var(--danger, #EF4444);
      }

      .auth-toggle-pwd[_ngcontent-%COMP%] {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        color: var(--text-secondary, #64748B);
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        display: flex;
        align-items: center;
        z-index: 1;
        transition: color 0.2s;
      }

      .auth-toggle-pwd[_ngcontent-%COMP%]:hover {
        color: var(--primary, #4E80EE);
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

      

      .auth-error[_ngcontent-%COMP%] {
        background: rgba(239, 68, 68, 0.08);
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 8px;
        padding: 10px 14px;
        color: var(--danger, #EF4444);
        font-size: 13px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      

      .auth-submit-btn[_ngcontent-%COMP%] {
        width: 100%;
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--primary, #4E80EE), var(--primary-dark, #3A66CC));
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
        box-shadow: 0 4px 14px rgba(78, 128, 238, 0.3);
      }

      .auth-submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
        opacity: 0.92;
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(78, 128, 238, 0.35);
      }

      .auth-submit-btn[_ngcontent-%COMP%]:active:not(:disabled) {
        transform: translateY(0);
      }

      .auth-submit-btn[_ngcontent-%COMP%]:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .auth-spinner[_ngcontent-%COMP%] {
        width: 18px;
        height: 18px;
        border: 2.5px solid rgba(255,255,255,0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: _ngcontent-%COMP%_authSpin 0.65s linear infinite;
      }

      @keyframes _ngcontent-%COMP%_authSpin {
        to { transform: rotate(360deg); }
      }

      

      .auth-footer[_ngcontent-%COMP%] {
        text-align: center;
        margin-top: 22px;
        font-size: 13.5px;
        color: rgba(255,255,255,0.75);
      }

      .auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
        color: #fff;
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: opacity 0.2s;
      }

      .auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
        opacity: 0.8;
      }

      

      .auth-field-hint[_ngcontent-%COMP%] {
        font-size: 11.5px;
        color: var(--danger, #EF4444);
        margin-top: 4px;
      }

      

      @media (max-width: 520px) {
        .auth-card-body[_ngcontent-%COMP%] {
          padding: 20px 18px;
        }
        .auth-card-header[_ngcontent-%COMP%] {
          padding: 20px 18px;
        }
      }`]})}}return o})();export{fn as InscriptionComponent};
