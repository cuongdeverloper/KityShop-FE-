import { Accordion } from "react-bootstrap";
import AdminCategoryProduct from "./AdminCategoryProduct";

const AdminManageProduct = () => {
    return (
        <div className="AdminManageProduct-container">
            <div className="MQ-title mb-3">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add Product</Accordion.Header>
                        <Accordion.Body>
                            <fieldset className="border rounded-3 p-3 body-addqz">
                                <legend className="float-none w-auto px-3 body-addqz">ADD Product</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Name" />
                                    <label htmlFor="floatingInput">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingDescription" placeholder="Description" />
                                    <label htmlFor="floatingDescription">Description</label>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-secondary mb-3">Save</button>
                                </div>
                            </fieldset>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="UpdateQ/A-title mb-3">
                <Accordion>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Category</Accordion.Header>
                        <Accordion.Body>
                        <AdminCategoryProduct/>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="AssignToUser-title mb-3">
                <Accordion>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Assign to user</Accordion.Header>
                        <Accordion.Body>
                            <AdminCategoryProduct/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="MQ-body">
                {/* Body content here */}
            </div>

            <div className="MQ-footer">
                {/* Footer content here */}
            </div>
        </div>
    );
}

export default AdminManageProduct;
