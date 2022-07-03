import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import { Table, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";

const Category = () => {
    const style = {
        main: {
            // border: '1px solid red',
            width: '1500px',
            margin: '10vh auto',
            padding: '10px'
        }
    }

    document.title = "DumbMerch | Category";

    const handleOnEdit = () => {
        alert("Data edited")
    }

    const handleOnDelete = () => {
        alert("Data deleted")
    }
    
    return(
        <>
            <NavbarAdmin />
            <div className="main" style={style.main}>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Category Name</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td class="col-5">Mouse</td>
                        <td class="col-2"> 
                        <Button variant="success" onClick={handleOnEdit} style={{padding: '5px 40px'}}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleOnDelete} style={{padding: '5px 30px'}}>Delete</Button>{' '}
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Keyboard</td>
                        <td>
                        <Button variant="success" onClick={handleOnEdit} style={{padding: '5px 40px'}}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleOnDelete} style={{padding: '5px 30px'}}>Delete</Button>{' '}
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Bag</td>
                        <td>
                        <Button variant="success" onClick={handleOnEdit} style={{padding: '5px 40px'}}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleOnDelete} style={{padding: '5px 30px'}}>Delete</Button>{' '}
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Stationary</td>
                        <td>
                        <Button variant="success" onClick={handleOnEdit} style={{padding: '5px 40px'}}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleOnDelete} style={{padding: '5px 30px'}}>Delete</Button>{' '}
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Doll</td>
                        <td>
                        <Button variant="success" onClick={handleOnEdit} style={{padding: '5px 40px'}}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleOnDelete} style={{padding: '5px 30px'}}>Delete</Button>{' '}
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Pillow</td>
                        <td>
                        <Button variant="success" onClick={handleOnEdit} style={{padding: '5px 40px'}}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleOnDelete} style={{padding: '5px 30px'}}>Delete</Button>{' '}
                        </td>
                    </tr>
                </tbody>
            </Table>
            </div>
        </>
    )
};

export default Category;

