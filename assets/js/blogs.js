import data from '../../content/blog/blogs.json' assert { type: 'json' };

// Get filters
const location = new URL(document.location);
let params = location.searchParams;
let dateFilter = params.get('date');
let blog = params.get('blog');
const months = [];

// Initiate html variables
let recentBlogsHTML = "";
let blogsOverviewHTML = "";
let dateFilterHTML = "";

// Get blogs
const blogs = data.values;

// Sort blogs on most recent first
blogs.sort(function(a, b) {
  // return b.date > a.date;
  const dateA = Date.parse(a.date);
  const dateB = Date.parse(b.date);
  return dateB - dateA;
});


export function fillRecentBlogs() {
  // Get last 5 blogs
  const recentBlogs = blogs.slice(0, 5);
  var recentBlogsDiv = document.getElementById("recent-post");
  recentBlogs.forEach(getRecentBlogHTML);
  recentBlogsDiv.innerHTML = recentBlogsHTML;
}

function getRecentBlogHTML(item) {
  let itemTitle = item[globalLang].title;
  let html = "<div class='recent-single-post'>";
  html += "<div class='post-img'>";
  html += "<a href=''#''>";
  html += "<img src='./content/blog/" + item.name + "/" + item.image + "' alt=''>";
  html += "</a></div><div class='pst-content'>";
  html += "<p><a href='#'> " + itemTitle + "</a></p>";
  html += "</div></div>";
  recentBlogsHTML += html;
}

export function fillBlogsOverview() {
  var blogsOverviewDiv = document.getElementById("blogs-overview");
  if (blog) {
    const item = blogs.find(item => item.name === blog);
    blogsOverviewDiv.innerHTML = getBlogDetailsHTML(item);
  } else {
    const filteredBlogs = extraFilters();
    if (filteredBlogs.length > 0) {
      filteredBlogs.forEach(getBlogsOverviewHTML);
      blogsOverviewDiv.innerHTML = blogsOverviewHTML;
    }
  }
}

function extraFilters() {
  let newBlogs = blogs;
  if (dateFilter) {
    const filterMonth = parseInt(dateFilter.substring(0, 2));
    const filterYear = parseInt(dateFilter.substring(2, 6));
    newBlogs = blogs.filter(obj => {
        const objDate = new Date(obj.date);
        const objMonth = objDate.getMonth() + 1;
        const objYear = objDate.getFullYear();
        return objMonth === filterMonth && objYear === filterYear
    })
  }
  return newBlogs;
}

function getBlogsOverviewHTML(item) {
  let itemTitle = item[globalLang].title;
  let itemIntro = item[globalLang].intro;
  const itemDate = new Date(item.date);
  const localDateFormat = getLocalDateFormat(itemDate);
  const blogDetailsUrl = "blog.html?lang=" + globalLang + "&blog=" + item.name;
  let buttonText = "Lees meer";  // Default
  switch (globalLang) {
    case 'en':
      buttonText = "Read more";
      break;
    case 'nl':
      buttonText = "Lees meer";
      break;
  }
  let html = "<div class='col-md-12 col-sm-12 col-xs-12'>";
  html += "<div class='single-blog'>";
  html += "<div class='single-blog-img'>";
  html += "<a href='" + blogDetailsUrl + "'>";
  html += "<img src='./content/blog/" + item.name + "/" + item.image + "' alt=''>";
  html += "</a></div><div class='blog-meta'>";
  html += "<span class='date-type'>";
  html += "<i class='bi bi-calendar'></i>" + localDateFormat + "</span></div>";
  html += "<div class='blog-text'><h4><a href='#'>" + itemTitle + "</a></h4>";
  html += "<p>" + itemIntro + "</p></div>";
  html += "<span><a href='" + blogDetailsUrl + "' class='ready-btn'>" + buttonText + "</a></span></div></div>";
  blogsOverviewHTML += html;
}

function getBlogDetailsHTML(item) {
  let itemTitle = item[globalLang].title;
  const itemDate = new Date(item.date);
  const localDateFormat = getLocalDateFormat(itemDate);
  let html = "<div class='col-md-12 col-sm-12 col-xs-12'>";
  html += "<article class='blog-post-wrapper'><div class='post-thumbnail'>";
  html += "<img src='./content/blog/" + item.name + "/" + item.image + "' alt=''></div>";
  html += "<div class='post-information'><h2>" + itemTitle + "</h2><div class='entry-meta'>";
  html += "<span class='author-meta'><i class='bi bi-person'></i>" + item.author + "</span>";
  html += "<span><i class='bi bi-calendar'></i>" + localDateFormat + "</span></div>";
  html += "<div class='entry-content'>";
  html += "<zero-md src='content/blog/" + item.name + "/" + globalLang + ".md'>";
  html += "</zero-md></div></article></div>";
  return html;
}

export function fillDateFilter() {
  var dateFilterDiv = document.getElementById("date-filter");
  getDatesFilterHTML();
  dateFilterDiv.innerHTML = dateFilterHTML;
}

function getDatesFilterHTML() {
  let header = "Datum";  // Default
  let all = "Alle datums";  // Default
  switch (globalLang) {
    case 'en':
      header = "Date";
      all = "All dates";
      break;
    case 'nl':
      header = "Datum";
      all = "Alle datums";
      break;
  }
  dateFilterHTML = "<h4>" + header + "</h4>";
  dateFilterHTML += "<ul><li><a href='?lang=" + globalLang + "'>" + all + "</a></li>";
  blogs.forEach(getMonths);
  const uniqueMonths = Array.from(new Set(months.map(JSON.stringify))).map(JSON.parse)
  uniqueMonths.forEach(getDatesFilterItemHTML);
  dateFilterHTML += "</ul>";
}

function getMonths(item) {
  const itemDate = new Date(item.date);
  months.push({
    "month": itemDate.getMonth(),
    "year": itemDate.getFullYear()
  });
}

function getDatesFilterItemHTML(item) {
  const monthYearText = getMonthName(item.month) + " " + item.year;
  let mm = item.month + 1;
  if (mm < 10) mm = '0' + mm;
  const monthYearUrl = "blog.html?lang=" + globalLang + "&date=" + mm + item.year;
  dateFilterHTML += "<li><a href='" + monthYearUrl + "'>" + monthYearText + "</a></li>";
}

function getLocalDateFormat(date) {
    // gives you your current date
  const yyyy = date.getFullYear();
  let mm = getMonthName(date.getMonth()); // Months start at 0!
  let dd = date.getDate();

  return dd + ' ' + mm + ' ' + yyyy;
}

function getMonthName(month) {
  const monthNamesNL = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"
  ];
  const monthNamesEN = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  let localMonthName = monthNamesNL;  // Default
  switch (globalLang) {
    case 'en':
      localMonthName = monthNamesEN[month];
      break;
    case 'nl':
      localMonthName = monthNamesNL[month];
      break;
  }
  return localMonthName;
}
