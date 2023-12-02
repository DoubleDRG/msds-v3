import "styles/fonts.scss";
import Header from "components/common/Header";
import { ReactComponent as PlantProfile } from "assets/icons/icon_plant_profile.svg";
import { ReactComponent as Profile } from "assets/icons/icon_profile.svg";
import Tag from "components/common/Tag";
import styled from "styled-components";
import COLOR from "styles/colors";
import PlusIcon from "components/MyInfo/PlusIcon";
import { Link } from "react-router-dom";
import Routes from "router/Routes";
import { FONT_STYLES } from "styles/fontStyle";
import { useEffect, useState } from "react";
import { getPlants } from "api/myPlant";
interface plantListType {
  name: string;
  nickname: string;
  color: string;
  id?: number;
  image: string;
  creatDate?: string;
  owner?: string;
}
export default function MyInfo() {
  useEffect(() => {
    getPlantList();
  }, []);
  const getPlantList = async () => {
    const res = await getPlants();
    setPlantList(res.plantList);
  };
  const [plantList, setPlantList] = useState<plantListType[] | []>([]);

  return (
    <StyledInfoWrapper>
      <Header icon="previous" title="내 식물" color={COLOR.BG_GRAY_F} />
      <StyledInfoContainer>
        <StyledProfile>
          <Profile />
          <StyledProfileName>홈 가드너</StyledProfileName>
        </StyledProfile>
        <StyledPlantLi>
          <StyledPlantTxt>내 식물 리스트</StyledPlantTxt>
          {plantList.map(
            ({ id, name, nickname, color }) =>
              name &&
              nickname && (
                <StyledPlant key={id}>
                  <PlantProfile />
                  <StyledPlantNameContainer>
                    <Tag type={name} color={color} />
                    <StyledName>{nickname}</StyledName>
                  </StyledPlantNameContainer>
                </StyledPlant>
              )
          )}
        </StyledPlantLi>
      </StyledInfoContainer>
      <Link to={Routes.Enroll}>
        <PlusIcon />
      </Link>
    </StyledInfoWrapper>
  );
}
const StyledInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${COLOR.BG_GREEN_28};
`;
const StyledInfoContainer = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.BG_GRAY_F};
  border-radius: 16px 16px 0px 0px;
  position: relative;
  margin-top: 8.8rem;
`;
const StyledProfile = styled.div`
  position: absolute;
  top: -9rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;
const StyledProfileName = styled.h2`
  margin-top: -4rem;
  font-size: 1.8rem;
  letter-spacing: -0.04rem;
  ${FONT_STYLES.GM_M}
`;
const StyledPlantLi = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 2rem;
`;
const StyledPlantTxt = styled.h4`
  margin-top: 10.8rem;
  color: ${COLOR.FONT_BLACK_1F};
  ${FONT_STYLES.PR_M}
  letter-spacing: -0.03rem;
  font-size: 1.6rem;
`;
const StyledPlant = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 2rem;
  background-color: white;
  border-radius: 1.8rem;
  box-shadow: 0px 6px 5px 0px rgba(13, 63, 103, 0.1);
`;
const StyledPlantNameContainer = styled.div``;
const StyledName = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
`;
