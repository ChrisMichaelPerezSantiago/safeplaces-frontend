import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const casesService = {
  fetchCases: ({ organizationId }) => {
    return axios({
      method: 'get',
      url: `${REACT_APP_API_URL}organization/cases`,
      data: {
        organizationId,
      },
    });
  },
  fetchCase: ({ organizationId = 'rocket' }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}organization/case`,
      data: {
        organizationId,
      },
    });
  },
  fetchPoints: ({ caseId }) => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}case/points`,
      data: {
        caseId,
      },
    });
  },
};

export default casesService;