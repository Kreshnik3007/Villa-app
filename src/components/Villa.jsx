import React, {useState, useEffect} from 'react';
import axios from "axios";
import VillaForm from "./VillaForm";
import Swal from "sweetalert2";
import './Styles.css'
import CustomModal from "./CustomModal";
function Villa() {
    const [updatedVilla, setUpdatedVilla] = useState([])
    const [villa, setVilla] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [biggerImage, setBiggerImage] = useState('')
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const GetVilla = async () => axios.get("https://localhost:44366/api/VillaAPI")
        try {
            GetVilla().then((response) => setVilla(response.data) + updatedVilla)
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }, [updatedVilla])
    const deleteVilla = async (id) => {
        Swal.fire({
            title: 'Villa',
            text: 'Are u sure u want to delete this Villa',
            icon: 'warning',
            confirmButtonText: 'Delete',
            showCloseButton: true,
        }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`https://localhost:44366/api/VillaAPI/${id}`)
                    setVilla((prevState => prevState.filter(x => x.id !== id)))
                }
            }
        )
    }

    const closeModal = () => {
        setOpen(false);
    }


    return (
        <div style={{background: '#282c34', color: "wheat"}}>
            <VillaForm villa={villa} setUpdatedVilla={setUpdatedVilla}/>
            <CustomModal open={open} closeModal={closeModal} biggerImage={biggerImage}/>
            <div className="Villas">
                {!isLoading && villa.map((villas) => {

                    return(
                    <div className="villa" key={villas.id}>
                        <button id='deleteBtn' className='btn btn-danger' onClick={() => deleteVilla(villas.id)}>X
                        </button>
                        <h3>{villas.name}</h3>
                        <div className="divider"></div>
                        <p>Occupancy: {villas.ocupancy}</p>
                        <p>Square Feet: {villas.sqft}</p>
                        <p>Rate: {villas.rate}</p>
                        <p>Details: <br/>{villas.details}</p>
                        <img className='ImageUrl' alt='pic' src={villas.imageUrl} onClick={() => { setOpen(true); setBiggerImage(villas.imageUrl)}}/>
                    </div>
                    ) })}
            </div>
        </div>
    );
}

export default Villa;