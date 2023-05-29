import { authService } from "services";
import { useNavigate } from "react-router-dom";
import useQuery from "utils/hooks/useQuery";

export const authLogin = async (dataReq) => {
  const navigate = useNavigate();
  const query = useQuery();

  if (dataReq) {
    console.log("----authLogin has work---", dataReq);
    try {
      const response = await authService.login(dataReq);
      const data = await response.json();
      console.log("----data----", data);
      if (data) {
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        console.log("-------redirectUrl----", redirectUrl);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
      }
      return data;
    } catch (error) {
      // dispatch(failure(error));
    }
  }
};
