import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const authService = {
  getToken: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}login`,
      data,
    });
  },
  getOrganization: async () => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}organization`,
    });
  },
  getOrganizationConfig: async () => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}organization/configuration`,
    });
  },
  login: async data => {
    let orgRes = null;
    let user = null;

    const response = await authService.getToken(data);
    const { status } = response;

    if (status === 200) {
      orgRes = await authService.getOrganizationConfig();
      if (orgRes) {
        user = orgRes ? { ...orgRes.data } : null;
      }
    }

    return { user, token: status };
  },
  onboarding: data => {
    return axios({
      method: 'PUT',
      url: `${REACT_APP_API_URL}organization/configuration`,
      data,
    });
  },
};

export default authService;
