const API_BASE_URL = "https://tokenmaker-apis.block-brew.com/"

const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

const BANNER_DETAILS = getApiUrl("cms/bannerdetails");
const BANNER_PUT = getApiUrl("cms/banner");
// const FEATURE_DETAILS = getApiUrl("cms/featuredetails");
const CUSTOM_DETAILS = getApiUrl("cms/customdetails");
const CUSTOM_PUT = getApiUrl("cms/custom");
// const START_SECTION_DETAILS = getApiUrl("cms/startsectiondetails");
const FAQS = getApiUrl('faq/faqsdata');
const FAQS_POST = getApiUrl('faq/newfaq');
const FAQS_EDIT = getApiUrl('faq/editfaq');
const FAQS_UPDATE = getApiUrl('faq/faqupdate');

// const FEATURES = getApiUrl('cms/features');
// const STEPS = getApiUrl('cms/steps');
const FOOTER = getApiUrl('cms/footerdetails')
const FOOTER_PUT = getApiUrl('cms/footer')
const HEADER = getApiUrl('cms/headerdetails')
const HEADER_PUT = getApiUrl('cms/header')
export {FOOTER,FOOTER_PUT,HEADER,HEADER_PUT,BANNER_DETAILS,BANNER_PUT,CUSTOM_DETAILS,CUSTOM_PUT,
    FAQS,FAQS_UPDATE,FAQS_POST,FAQS_EDIT
}