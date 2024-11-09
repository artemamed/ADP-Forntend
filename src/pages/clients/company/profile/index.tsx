import { useParams } from 'react-router-dom';

const CompanyProfile = () => {
  const { serialCode } = useParams();
  return <div>{serialCode}</div>;
};

export default CompanyProfile;
