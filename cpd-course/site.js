// Teaching about Grenfell: interior page behaviour
// 1) local-only progress note  2) sidebar built from the course map  3) mobile contents toggle
(function(){
  "use strict";

  var COURSE = [{"t":"Introduction to the Course","i":[{"k":"p","t":"Welcome to the Course","f":"welcome-to-the-course.html"},{"k":"p","t":"The Project","f":"the-project.html"},{"k":"p","t":"Our approach","f":"our-approach.html"},{"k":"p","t":"People","f":"people.html"}]},{"t":"CPD Week 1","i":[{"k":"p","t":"Week 1: Learning Objectives","f":"week-1-learning-objectives.html"},{"k":"p","t":"About You","f":"about-you.html"},{"k":"s","t":"1-1: THE STORY BEFORE THE FIRE"},{"k":"p","t":"A tale of two Kensingtons","f":"a-tale-of-two-kensingtons.html"},{"k":"p","t":"Activity: Explore a Tale of Two Kensingtons through Google Maps","f":"activity-explore-a-tale-of-two-kensingtons-through-google-maps.html"},{"k":"p","t":"The Demographic Contrast","f":"the-demographic-contrast.html"},{"k":"p","t":"Who Lived In The Tower?","f":"who-lived-in-the-tower.html"},{"k":"p","t":"Unheeded Warnings","f":"unheeded-warnings.html"},{"k":"p","t":"“Show Me the Bodies”","f":"show-me-the-bodies.html"},{"k":"p","t":"Quiz: Understanding Grenfell","f":"quiz-understanding-grenfell.html"},{"k":"p","t":"Grenfell Tower: A Timeline of Failures","f":"grenfell-tower-a-timeline-of-failures.html"},{"k":"s","t":"1-2: EDUCATION FOR DISASTER JUSTICE"},{"k":"p","t":"How Should We Approach Teaching About Grenfell?","f":"how-should-we-approach-teaching-about-grenfell.html"},{"k":"p","t":"What Is Education For Disaster Justice?","f":"what-is-education-for-disaster-justice.html"},{"k":"p","t":"How Not To Teach About Disasters","f":"how-not-to-teach-about-disasters.html"},{"k":"p","t":"Where Might Grenfell-Related Themes Meaningfully Sit?","f":"curriculum-mapping-where-might-grenfell-related-themes-meaningfully-sit.html"},{"k":"p","t":"End of Week 1 & Further Reading","f":"end-of-week-1-and-further-reading.html"}]},{"t":"CPD Week 2","i":[{"k":"p","t":"Week 2: Learning Objectives","f":"week-2-learning-objectives.html"},{"k":"s","t":"2-1: THE NIGHT OF THE FIRE"},{"k":"p","t":"Where Were You The Night Of The Fire?","f":"where-were-you-the-night-of-the-fire-2.html"},{"k":"p","t":"The Grenfell Tower Inquiry Report","f":"the-grenfell-tower-inquiry-report.html"},{"k":"p","t":"How Did The Fire Start?","f":"how-did-the-fire-start.html"},{"k":"p","t":"How Did It Spread?","f":"how-did-it-spread.html"},{"k":"p","t":"Why Did It Spread So Quickly?","f":"why-did-it-spread-so-quickly.html"},{"k":"p","t":"Survivors’ Accounts","f":"survivors-accounts.html"},{"k":"s","t":"2-2: WHAT TO TEACH ABOUT GRENFELL"},{"k":"p","t":"What Should Learners Understand About Grenfell?","f":"what-should-learners-understand-about-grenfell.html"},{"k":"p","t":"What Should Learners Be Able to Do?","f":"what-should-learners-be-able-to-do.html"},{"k":"p","t":"Curriculum Mapping","f":"curriculum-mapping.html"},{"k":"p","t":"Media Failures and Delayed Justice in Hillsborough and Grenfell","f":"media-failures-and-delayed-justice-in-hillsborough-and-grenfell.html"},{"k":"p","t":"Disrupting Media Narratives of Disaster","f":"disrupting-media-narratives-of-disaster.html"},{"k":"p","t":"End of Week 2 & Further Reading","f":"end-of-week-2-and-further-reading.html"}]},{"t":"CPD Week 3","i":[{"k":"p","t":"Week 3: Learning Objectives","f":"week-3-learning-objectives.html"},{"k":"s","t":"3-1: SINCE THE FIRE"},{"k":"p","t":"What Happened After the Fire?","f":"what-happened-after-the-fire.html"},{"k":"p","t":"Bringing a Community Together","f":"bringing-a-community-together.html"},{"k":"p","t":"How Should We Remember Grenfell?","f":"how-should-we-remember-grenfell.html"},{"k":"p","t":"Literature as Remembrance","f":"literature-as-remembrance.html"},{"k":"p","t":"The Future of Grenfell (1)","f":"the-future-of-grenfell.html"},{"k":"p","t":"The Future of Grenfell (2)","f":"the-future-of-grenfell-2.html"},{"k":"s","t":"3-2: HOW TO TEACH ABOUT GRENFELL"},{"k":"p","t":"Exercise: Mapping Your Moral Compass","f":"exercise-mapping-your-moral-compass.html"},{"k":"p","t":"How Should We Teach About Grenfell? The CARE–LEAD Approach ","f":"how-should-we-teach-about-grenfell-the-care-lead-approach.html"},{"k":"p","t":"Teaching Grenfell in an Unfinished Present","f":"teaching-grenfell-in-an-unfinished-present.html"},{"k":"p","t":"Exercise: Design Your Grenfell Learning Experience","f":"exercise-design-your-grenfell-learning-experience.html"},{"k":"p","t":"End of Week 3 & Further Reading","f":"end-of-week-3-and-further-reading.html"},{"k":"p","t":"Course Feedback","f":"course-feedback.html"}]}];

  // ---- local progress (stored only in this browser, never sent) ----
  try{
    var key='grenfell_cpd_pages_viewed';
    var path=location.pathname.split('/').pop();
    if(path && path.slice(-5)==='.html'){
      var viewed=new Set(JSON.parse(localStorage.getItem(key)||'[]'));
      viewed.add(path);
      localStorage.setItem(key, JSON.stringify(Array.from(viewed)));
    }
  }catch(e){}

  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  function buildNav(nav){
    var here=location.pathname.split('/').pop();
    var html=''+
      '<a class="brand" href="../index.html"><span class="b-title">Teaching about Grenfell</span>'+
      '<span class="b-sub">Education and Social Justice after Disasters</span></a>'+
      '<a class="home-link" href="../index.html">All modules</a>';
    COURSE.forEach(function(group){
      html+='<h2>'+esc(group.t)+'</h2><ul>';
      group.i.forEach(function(it){
        if(it.k==='s'){ html+='<li class="subheader">'+esc(it.t)+'</li>'; }
        else{
          var active=(it.f===here);
          html+='<li><a href="'+esc(it.f)+'"'+(active?' class="active" aria-current="page"':'')+'>'+esc(it.t)+'</a></li>';
        }
      });
      html+='</ul>';
    });
    nav.innerHTML=html;
  }

  document.addEventListener('DOMContentLoaded', function(){
    var nav=document.querySelector('nav.sidebar');
    if(!nav) return;
    buildNav(nav);

    // mobile "Course contents" toggle
    var btn=document.createElement('button');
    btn.className='nav-toggle';
    btn.type='button';
    btn.textContent='Course contents';
    btn.setAttribute('aria-expanded','false');
    var layout=document.querySelector('.layout');
    if(layout && layout.parentNode){
      layout.parentNode.insertBefore(btn, layout);
      btn.addEventListener('click', function(){
        var open=nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open?'true':'false');
      });
      // close after choosing a page on mobile
      nav.addEventListener('click', function(e){
        if(e.target.tagName==='A' && window.matchMedia('(max-width:900px)').matches){
          nav.classList.remove('open'); btn.setAttribute('aria-expanded','false');
        }
      });
    }
  });

  // ---- self-check quizzes: reveal correct / incorrect on selection ----
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.choice-list').forEach(function(list){
      if(!list.querySelector('[data-correct]')) return;   // only wire real quizzes
      list.querySelectorAll('li').forEach(function(li){
        li.setAttribute('role','button');
        li.tabIndex=0;
        li.setAttribute('aria-pressed','false');
        function toggle(){
          var on=li.classList.toggle('chosen');
          li.setAttribute('aria-pressed', on?'true':'false');
          li.classList.remove('correct','incorrect');
          if(on){ li.classList.add(li.hasAttribute('data-correct')?'correct':'incorrect'); }
        }
        li.addEventListener('click', toggle);
        li.addEventListener('keydown', function(e){
          if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); }
        });
      });
    });
  });

})();

/*
  CPD feedback form
  -----------------
  Posts feedback to a Google Apps Script web app, which writes to Google Sheets.
  The endpoint is set in feedback-config.js so it can be changed without editing
  this shared course script.
*/
(function(){
  "use strict";

  document.addEventListener('DOMContentLoaded', function(){
    var form=document.querySelector('[data-cpd-feedback-form]');
    if(!form) return;

    var endpoint=String(window.GRENFELL_CPD_FEEDBACK_ENDPOINT||'').trim();
    var statusEl=form.querySelector('[data-feedback-status]');
    var submitBtn=form.querySelector('[data-feedback-submit]');
    var submitLabel=submitBtn?submitBtn.textContent:'Submit feedback';
    var consent=form.querySelector('[data-contact-consent]');
    var contactDetails=form.querySelector('[data-contact-details]');
    var nameInput=form.querySelector('[name="contact_name"]');
    var emailInput=form.querySelector('[name="contact_email"]');
    var discovery=form.querySelector('[data-discovery-source]');
    var discoveryOther=form.querySelector('[data-discovery-other]');
    var discoveryOtherInput=form.querySelector('[name="discovery_other"]');
    var comment=form.querySelector('[name="feedback_comment"]');
    var characterCount=form.querySelector('[data-character-count]');

    var fieldLabels={
      rating_overall:'overall course rating',
      rating_relevance:'relevance rating',
      rating_confidence:'confidence rating',
      educational_role:'main role',
      educational_setting:'main educational setting',
      discovery_source:'how you found out about the course',
      discovery_other:'how you found the course',
      contact_name:'name',
      contact_email:'valid email address',
      turnstile:'verification challenge'
    };

    function setStatus(type,message){
      if(!statusEl) return;
      statusEl.hidden=false;
      statusEl.className='feedback-status feedback-status--'+type;
      statusEl.textContent=message;
    }

    function hideStatus(){
      if(statusEl) statusEl.hidden=true;
    }

    function resetTurnstile(){
      try{if(window.turnstile) window.turnstile.reset();}catch(err){}
    }

    function turnstileToken(){
      var field=form.querySelector('[name="cf-turnstile-response"]');
      if(field&&field.value) return field.value;
      try{if(window.turnstile) return window.turnstile.getResponse();}catch(err){}
      return '';
    }

    function selected(name){
      var field=form.querySelector('[name="'+name+'"]:checked');
      return field?field.value:'';
    }

    function value(name){
      var field=form.querySelector('[name="'+name+'"]');
      return field?String(field.value||'').trim():'';
    }

    function joinNatural(items){
      if(!items.length) return '';
      if(items.length===1) return items[0];
      if(items.length===2) return items[0]+' and '+items[1];
      return items.slice(0,-1).join(', ')+', and '+items[items.length-1];
    }

    function groupFor(name){
      return form.querySelector('[data-validation-group="'+name+'"]');
    }

    function messageFor(name){
      return form.querySelector('[data-error-for="'+name+'"]');
    }

    function fieldsFor(name){
      if(name==='turnstile') return [];
      return Array.prototype.slice.call(form.querySelectorAll('[name="'+name+'"]'));
    }

    function setFieldError(name,message){
      var group=groupFor(name);
      var error=messageFor(name);
      var fields=fieldsFor(name);
      var errorId='feedback-error-'+name.replace(/[^a-z0-9_-]/gi,'-');

      if(group) group.classList.add('is-invalid');
      if(error){
        error.id=errorId;
        if(message) error.textContent=message;
        error.hidden=false;
      }

      fields.forEach(function(field){
        field.setAttribute('aria-invalid','true');
        var describedBy=String(field.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean);
        if(describedBy.indexOf(errorId)===-1) describedBy.push(errorId);
        field.setAttribute('aria-describedby',describedBy.join(' '));
      });
    }

    function clearFieldError(name){
      var group=groupFor(name);
      var error=messageFor(name);
      var fields=fieldsFor(name);
      var errorId='feedback-error-'+name.replace(/[^a-z0-9_-]/gi,'-');

      if(group) group.classList.remove('is-invalid');
      if(error) error.hidden=true;

      fields.forEach(function(field){
        field.removeAttribute('aria-invalid');
        var describedBy=String(field.getAttribute('aria-describedby')||'').split(/\s+/).filter(function(id){
          return id&&id!==errorId;
        });
        if(describedBy.length) field.setAttribute('aria-describedby',describedBy.join(' '));
        else field.removeAttribute('aria-describedby');
      });
    }

    function clearAllErrors(){
      Object.keys(fieldLabels).forEach(clearFieldError);
    }

    function focusField(name){
      var group=groupFor(name);
      var field=null;
      if(name!=='turnstile') field=form.querySelector('[name="'+name+'"]');
      if(field&&typeof field.focus==='function'){
        field.focus({preventScroll:true});
      }
      var target=group||field;
      if(target&&typeof target.scrollIntoView==='function'){
        target.scrollIntoView({behavior:'smooth',block:'center'});
      }
    }

    function showFieldErrors(names,summaryMessage){
      var unique=[];
      names.forEach(function(name){
        if(fieldLabels[name]&&unique.indexOf(name)===-1) unique.push(name);
      });
      unique.forEach(function(name){setFieldError(name);});

      var labels=unique.map(function(name){return fieldLabels[name];});
      var message=summaryMessage;
      if(!message&&labels.length){
        message='Please complete the highlighted '+(labels.length===1?'question':'questions')+': '+joinNatural(labels)+'.';
      }
      setStatus('error',message||'Please check the highlighted questions.');
      if(unique.length) focusField(unique[0]);
    }

    function updateContactFields(){
      var enabled=!!(consent&&consent.checked);
      if(contactDetails) contactDetails.hidden=!enabled;
      if(nameInput) nameInput.required=enabled;
      if(emailInput) emailInput.required=enabled;
      if(!enabled){
        if(nameInput) nameInput.value='';
        if(emailInput) emailInput.value='';
        clearFieldError('contact_name');
        clearFieldError('contact_email');
      }
    }

    function updateDiscoveryOther(){
      var show=!!(discovery&&discovery.value==='Other');
      if(discoveryOther) discoveryOther.hidden=!show;
      if(discoveryOtherInput){
        discoveryOtherInput.required=show;
        if(!show){
          discoveryOtherInput.value='';
          clearFieldError('discovery_other');
        }
      }
    }

    function updateCharacterCount(){
      if(characterCount&&comment) characterCount.textContent=comment.value.length+' / 4000';
    }

    function clientValidationFields(){
      var missing=[];
      if(!selected('rating_overall')) missing.push('rating_overall');
      if(!selected('rating_relevance')) missing.push('rating_relevance');
      if(!selected('rating_confidence')) missing.push('rating_confidence');
      if(!value('educational_role')) missing.push('educational_role');
      if(!value('educational_setting')) missing.push('educational_setting');
      if(!value('discovery_source')) missing.push('discovery_source');
      if(value('discovery_source')==='Other'&&!value('discovery_other')) missing.push('discovery_other');
      if(consent&&consent.checked){
        if(!value('contact_name')) missing.push('contact_name');
        if(!value('contact_email')||!(emailInput&&emailInput.validity.valid)) missing.push('contact_email');
      }
      return missing;
    }

    if(consent) consent.addEventListener('change',function(){
      updateContactFields();
      hideStatus();
    });
    if(discovery) discovery.addEventListener('change',function(){
      updateDiscoveryOther();
      clearFieldError('discovery_source');
      hideStatus();
    });
    if(comment) comment.addEventListener('input',updateCharacterCount);

    updateContactFields();
    updateDiscoveryOther();
    updateCharacterCount();

    form.addEventListener('input',function(event){
      var name=event.target&&event.target.name;
      if(name) clearFieldError(name);
      hideStatus();
    });

    form.addEventListener('change',function(event){
      var name=event.target&&event.target.name;
      if(name) clearFieldError(name);
      hideStatus();
    });

    form.addEventListener('submit',function(event){
      event.preventDefault();
      clearAllErrors();

      var missing=clientValidationFields();
      if(missing.length){
        showFieldErrors(missing);
        return;
      }

      if(!endpoint||endpoint.indexOf('script.google.com/macros/s/')===-1){
        setStatus('error','This form has not yet been connected to its Google Sheet. Please contact the project team.');
        return;
      }

      var token=turnstileToken();
      if(!token){
        showFieldErrors(['turnstile']);
        return;
      }
      clearFieldError('turnstile');

      var payload={
        rating_overall:selected('rating_overall'),
        rating_relevance:selected('rating_relevance'),
        rating_confidence:selected('rating_confidence'),
        feedback_comment:value('feedback_comment'),
        educational_role:value('educational_role'),
        educational_setting:value('educational_setting'),
        subject_area:value('subject_area'),
        country_region:value('country_region'),
        discovery_source:value('discovery_source'),
        discovery_other:value('discovery_other'),
        contact_consent:consent&&consent.checked?'yes':'no',
        contact_name:consent&&consent.checked?value('contact_name'):'',
        contact_email:consent&&consent.checked?value('contact_email'):'',
        company:value('company'),
        token:token
      };

      if(submitBtn){
        submitBtn.disabled=true;
        submitBtn.textContent='Submitting…';
      }
      setStatus('pending','Submitting your feedback…');

      fetch(endpoint,{
        method:'POST',
        body:JSON.stringify(payload),
        redirect:'follow',
        credentials:'omit'
      })
      .then(function(response){
        return response.text().then(function(text){
          try{return JSON.parse(text);}catch(err){return null;}
        });
      })
      .then(function(result){
        if(result&&result.status==='success'){
          form.reset();
          updateContactFields();
          updateDiscoveryOther();
          updateCharacterCount();
          clearAllErrors();
          try{localStorage.setItem('grenfell_cpd_feedback_submitted','true');}catch(err){}
          setStatus('success',result.message||'Thank you. Your feedback has been submitted.');
        }else{
          var backendFields=result&&Array.isArray(result.fields)?result.fields:[];
          if(backendFields.length){
            showFieldErrors(backendFields,result.message||'Please check the highlighted questions.');
          }else{
            setStatus('error',(result&&result.message)||'Sorry, something went wrong. Please try again.');
          }
        }
      })
      .catch(function(){
        setStatus('error','Sorry, your feedback could not be submitted. Please check your connection and try again.');
      })
      .then(function(){
        if(submitBtn){
          submitBtn.disabled=false;
          submitBtn.textContent=submitLabel;
        }
        resetTurnstile();
      });
    });
  });
})();
