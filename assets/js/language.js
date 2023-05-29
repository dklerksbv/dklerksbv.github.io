let params = (new URL(document.location)).searchParams;
let lang = params.get('lang');
var globalLang = "nl";

switch (lang) {
  case 'en':
    $('[lang]').hide();
    $('[lang="en"]').show();
    globalLang = "en";
    break;
  case 'nl':
    $('[lang]').hide();
    $('[lang="nl"]').show();
    globalLang = "nl";
    break;
  default:
    $('[lang]').hide();
    $('[lang="nl"]').show();
}
