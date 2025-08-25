export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getItem = (label, key, icon, children, type) => {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
};

export const renderOptions = (arr) => {
  let results = [];
  if (Array.isArray(arr)) {
    results = arr.map((options) => {
      return {
        value: options,
        label: options,
      };
    });
  }
  results.push({
    label: 'Thêm type',
    value: 'add_type',
  });
  return results;
};

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = 'vi_VN';
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: import.meta.env.VITE_FB_ID,
      cookie: true,
      xfbml: true,
      version: 'v8.6',
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `https://connect.facebook.net/${locale}/sdk.js`;
    // js.src = `https://connect.facebook.net/${locale}/sdk.js#xfbml=1&version=v3.0`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

export const convertDataChart = (data, type) => {
  try {
    const chartData = [];
    const object = {};
    Array.isArray(data) &&
      data?.forEach((opt) => {
        if (!object[opt[type]]) {
          object[opt[type]] = 1;
          chartData.push({
            name: opt[type],
            value: 1,
          });
        } else {
          object[opt[type]] += 1;
          chartData.forEach((item) => {
            if (item.name === opt[type]) {
              item.value += 1;
            }
          });
        }
      });
    return chartData;
  } catch (error) {
    return [];
  }
};
