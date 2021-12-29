const plugins = [
  'advlist autolink list link image print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons'
];

tinymce.init({
  language: 'pt_BR',
  selector: '#articleBodyRegister',
  plugins: plugins,
});
