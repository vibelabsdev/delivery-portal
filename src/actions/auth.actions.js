import { authService } from "services";
import { useNavigate } from "react-router-dom";
import useQuery from "utils/hooks/useQuery";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = async (dataReq) => {
  const navigate = useNavigate();
  const query = useQuery();

  if (dataReq) {

    try {
      const response = await authService.login(dataReq);
      const data = await response.json();
      if (data) {
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
      }
      return data;
    } catch (error) {
      // dispatch(failure(error));
    }
  }
};
