import React from "react";
import { useParams } from "react-router-dom";

function EditCampaign() {
  const { id } = useParams();

//   useEffect(() => {
//     if (user.isLoggedIn) {
//       getUserFilteringCondition(user.id)
//         .then((response) => {
//           if (response?.data?.length > 0) {
//             const { landId, buildingId } = setFilteringCriteria(
//               response?.data,
//               setValue
//             )
//             landId || buildingId ? setEditForm(true) : setEditForm(false)
//             landId && setLandId(() => landId.toString())
//             buildingId && setBuildingId(() => buildingId.toString())
//           }
//         })
//         .catch(() => {
//           dispatch({
//             show: true,
//             message: '何かがうまくいかなかった。',
//             variant: 'danger',
//             bgVariant: 'danger',
//           })
//         })
//     }
//   }, [user, setValue, dispatch])



  return <div>{`EditCampaign id : ${id}`}</div>;
}

export default EditCampaign;
