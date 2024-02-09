import other_packages_data from '../../content/pricesandpackages/other/packages.json' assert { type: 'json' };

// Get packages
const other_packages = other_packages_data.values;

// Initiate html variables
let otherPackagesHTML = "";

export function fillOtherPackages() {
  if (other_packages.length > 0) {
      otherPackagesHTML += getOtherPackagesTitleHtml();
      otherPackagesHTML += getPackagesDescriptionHtml("content/pricesandpackages/act/");
  }
  var otherPackagesDiv = document.getElementById("other_packages");
  other_packages.forEach(getBasicItemHTML);
  otherPackagesDiv.innerHTML = otherPackagesHTML;
}

function getBasicItemHTML(item) {
  let html = "<div class='col-md-3 col-sm-12'>";
  html += "<div class='pricing-table-3 mindfulness'>";
  html += "<div class='pricing-table-header-simple'>";
  html += "<h4><strong>" + item.name[globalLang] + "</strong></h4>";
  html += getPriceHtml(item);
  html += "</div><div class='pricing-body-simple'><ul class='pricing-table-ul'>";
  html += getSessionInfoHtml(item);
  html += getFrequencyHtml(item);
  html += getDigitalMFExcerciseHtml(item);
  html += getUpgradePossibilityHtml(item);
  html += getDownloadDescriptionHtml(item);
  html += "</ul>";
  html += getPaypalButtonHtml(item);
  html += "</div></div></div>";
  otherPackagesHTML += html;
}

function getOtherPackagesTitleHtml() {
  let title = "Overige pakketten";  // Default
  switch (globalLang) {
    case 'en':
      title = "Other packages";
      break;
    case 'nl':
      title = "Overige pakketten";
      break;
  }
  return getPackagesTitleHtml(title);
}

function getPackagesTitleHtml(title) {
  return "<div class='section-headline text-center'><h2>" + title + "</h2></div>";
}

function getPackagesDescriptionHtml(folder) {
  let termsAndConditionsTitle = "Algemene voorwaarden";  // Default
  switch (globalLang) {
    case 'en':
      termsAndConditionsTitle = "Terms and Conditions";
      break;
    case 'nl':
      termsAndConditionsTitle = "Algemene voorwaarden";
      break;
  }
  let description_html = "<div class='col-md-3 col-sm-12 order-md-4' style='margin:20px 0 0 0;'>";
  description_html += "<zero-md src='" + folder + globalLang + ".md'>";
  description_html += "<template><link href='assets/css/style.css' rel='stylesheet' /></template></zero-md>";
  description_html += "<a href='#' data-bs-toggle='modal' data-bs-target='#exampleModal'>" + termsAndConditionsTitle + "</a>";
  description_html += "</div>";
  return description_html;
}

function getPriceHtml(item) {
    let price_html = "";
    let priceFromText = "vanaf";  // Default
    switch (globalLang) {
      case 'en':
        priceFromText = "from";
        break;
      case 'nl':
        priceFromText = "vanaf";
        break;
    }
    if (item.hasOwnProperty('price_range') && item.price_range !== null && item.price_range.length > 0) {
      const validPrices = item.price_range.filter(item => item.price !== undefined && item.price !== null).map(item => item.price); // Extract prices
      price_html += "<p><strong>" + priceFromText + " " + formatPrice(Math.min(...validPrices)) + "</strong></p>";
    } else if (item.hasOwnProperty('price') && item.price !== null) {
      if (item.hasOwnProperty('discount') && item.discount !== null) {
        let discounted_price = item.price - item.discount;
        price_html += "<p><span class='strikethrough-price'>" + formatPrice(item.price) +"</span><strong>" + formatPrice(discounted_price) + "</strong></p>";
      } else {
          price_html += "<p><strong>" + formatPrice(item.price) + "</strong></p>";
      }
    }
    return price_html;
}

function formatPrice(price) {
    // Check if the price has any decimals
    if (price % 1 === 0) {
        // If price has no decimals, format it to include ,- suffix
        // Format with comma or dot as decimal separator based on globalLang
        return `€${price.toLocaleString(globalLang === 'nl' ? 'nl-NL' : 'en-US')},-`;
    } else {
        // If price has decimals, format it normally
        // Format with comma or dot as decimal separator based on globalLang and always show 2 decimal places
        return `€${price.toLocaleString(globalLang === 'nl' ? 'nl-NL' : 'en-US', { minimumFractionDigits: 2 })}`;
    }
}

function getSessionInfoHtml(item) {
  let session_info_html = "";
  let sessionLengthText = "";
  let sessionLengthConnectingText = " van ";  // Default
  let sessionsText = " sessies";  // Default
  switch (globalLang) {
    case 'en':
      sessionLengthConnectingText =  " of ";
      sessionsText = " sessions";
      break;
    case 'nl':
      sessionLengthConnectingText =  " van ";
      sessionsText = " sessies";
      break;
  }
  if (item.hasOwnProperty('session_length_in_minutes') && item.session_length_in_minutes !== null) {
    sessionLengthText = sessionLengthConnectingText + item.session_length_in_minutes + "min";  // Default
  }
  if (item.hasOwnProperty('number_of_sessions') && item.number_of_sessions !== null) {
    session_info_html += "<li><i class='fa fa-send'></i>" + item.number_of_sessions + sessionsText + sessionLengthText + "</li>";
  } else if (item.hasOwnProperty('number_of_group_sessions') && item.number_of_group_sessions !== null) {
    session_info_html += "<li><i class='fa fa-send'></i>" + item.number_of_group_sessions + sessionsText + sessionLengthText + "</li>";
  }

  return session_info_html;
}

function getUpgradePossibilityHtml(item) {
  let upgrade_html = "";
  if (item.hasOwnProperty('upgrade_possibility') && item.upgrade_possibility !== null) {
    if (item.upgrade_possibility.hasOwnProperty(globalLang) && item.upgrade_possibility[globalLang] !== null) {
      upgrade_html += "<li><i class='fa fa-user-plus'></i>" +  item.upgrade_possibility[globalLang] + "</li>";
    }
  }

  return upgrade_html;
}

function getDownloadDescriptionHtml(item) {
  let download_html = "";
  if (item.hasOwnProperty('download_description') && item.download_description !== null) {
    if (item.download_description.hasOwnProperty(globalLang) && item.download_description[globalLang] !== null) {
      download_html += "<li><i class='fa fa-download'></i>" +  item.download_description[globalLang] + "</li>";
    }
  }

  return download_html;
}

function getFrequencyHtml(item) {
  let frequency_html = "";
  if (item.hasOwnProperty('frequency') && item.frequency !== null) {
    if (item.frequency.hasOwnProperty(globalLang) && item.frequency[globalLang] !== null) {
      frequency_html += "<li><i class='fa fa-calendar'></i>" +  item.frequency[globalLang] + "</li>";
    }
  }

  return frequency_html;
}

function getDigitalMFExcerciseHtml(item) {
  let digital_mf_html = "";
  if (item.hasOwnProperty('digital_mf_exercises') && item.digital_mf_exercises == true) {
    let digitalMFText = " + Digitale MF Oefeningen";  // Default
    switch (globalLang) {
      case 'en':
        digitalMFText = " + Digital MF Exercises";
        break;
      case 'nl':
        digitalMFText = " + Digitale MF Oefeningen";
        break;
    }
    digital_mf_html += "<li><i class='fa fa-cloud'></i>" + digitalMFText + "</li>";
  }

  return digital_mf_html;
}

function getPaypalButtonHtml(item) {
  let button_html = "";
  if (item.hasOwnProperty('paypal_button_id') && item.paypal_button_id !== null) {
    let buttonTitle = "PayPal – de veiligere, gemakkelijkere manier om online te betalen!";  // Default
    let buttonText = "Nu kopen";  // Default
    switch (globalLang) {
      case 'en':
        buttonTitle =  "PayPal – the safer, easier way to pay online!";
        buttonText = "Buy now";
        break;
      case 'nl':
        buttonTitle =  "PayPal – de veiligere, gemakkelijkere manier om online te betalen!";
        buttonText = "Nu kopen";
        break;
    }
    button_html += "<form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_blank'>";
    button_html += "<input type='hidden' name='cmd' value='_s-xclick' />";
    button_html += "<input type='hidden' name='hosted_button_id' value='" + item.paypal_button_id + "' />";
    if (item.hasOwnProperty('price_range') && item.price_range !== null && item.price_range.length > 0) {
      let priceOptions = item.price_range.map(getPaypalButtonPriceOptions);
      if (priceOptions !== "") {
        button_html += "<table class='paypal_options'><tr><td><input type='hidden' name='on0' value='Opties'/><select name='os0'>";
        button_html += priceOptions;
        button_html += "</select></td></tr></table>";
      }
    }
    button_html += "<input type='hidden' name='currency_code' value='EUR' />"
    button_html += "<button type='submit' class='view-more' name='submit' title='" + buttonTitle + "' alt='" + buttonText + "'>" + buttonText + "</button>";
    button_html += "</form>"
  }

  return button_html;
}

function getPaypalButtonPriceOptions(option) {
  if (!option.hasOwnProperty('option_name') || option.option_name === null || !option.hasOwnProperty('price') || option.price === null) {
    return "";
  }
  return "<option value='" + option.option_name + "'>" + option.option_name + ": " + formatPrice(option.price) + "</option>";
}

function getPackageHTML(item) {
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
