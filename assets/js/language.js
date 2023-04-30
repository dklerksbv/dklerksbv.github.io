let params = (new URL(document.location)).searchParams;
let lang = params.get('lang');

switch (lang) {
  case 'en':
    $('[lang]').hide();
    $('[lang="en"]').show();
    break;
  case 'nl':
    $('[lang]').hide();
    $('[lang="nl"]').show();
    break;
  default:
    $('[lang]').hide();
    $('[lang="nl"]').show();
}
