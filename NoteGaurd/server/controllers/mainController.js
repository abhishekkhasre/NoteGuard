exports.homepage = async (req,res)=>{
     
     const locals = {
          title: "Home",
          description: "NoteGuard"
     };
     res.render('index',{
          locals,
          layout: '../views/layouts/front-page',
     
     }); 
}

exports.about = async (req,res)=>{
     const locals = {
          title: "About",
          description: "NoteGuard"
     };
     res.render('about',locals); 
}


exports.feature = async (req,res)=>{
     const locals = {
          title: "Features",
          description: "NoteGuard"
     };
     res.render('feature',locals); 
}


exports.faq= async (req,res)=>{
     const locals = {
          title: "FAQ",
          description: "NoteGuard"
     };
     res.render('faq',locals); 
}
