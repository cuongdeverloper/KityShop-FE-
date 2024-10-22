import { useEffect, useState } from "react";
import { getListCategoriesApi } from "../../../service/ApiService";
import { useNavigate } from "react-router-dom";

const AdminCategoryProduct = () => {
    const [dataListCategory, setDataListCategory] = useState([]);
    const navigate = useNavigate();

    const getAllCategories = async () => {
        try {
            let response = await getListCategoriesApi();
            if (response.errorCode === 0) {
                setDataListCategory(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAccessProductByCategory = (data) => {
        navigate(`/AdmManager/Product/${data}`)
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div>
            {dataListCategory && dataListCategory.length > 0 ? (
                dataListCategory.map((item, index) => (
                    <div key={index}>
                        <span onClick={() => handleAccessProductByCategory(item)}>
                            {dataListCategory[index] || "Unnamed Category"}
                        </span>
                        <br />
                    </div>
                ))
            ) : (
                <p>No categories found</p>
            )}
        </div>
    );
};

export default AdminCategoryProduct;
