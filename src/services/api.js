import axios from 'axios';

const request = async params => {
  const { data } = await axios(params);
  return data;
};

const postRequest = (url, data, params) => {
  return request({
    method: 'POST',
    url,
    data,
    ...params
  });
};

const genPresignedPost = fileName => {
  return postRequest('/highlight/presignedPost', { fileName });
};


//TODO: Fix below (not working yet)
export const uploadFileToS3 = async (fileName, data) => {
  const { url, fields } = await genPresignedPost(fileName);
  return postRequest(
    url,
    {
      formData: {
        ...fields,
        file: data
      }
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
};
