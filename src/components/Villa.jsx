import React, {useState, useEffect} from 'react';
import axios from "axios";
import VillaForm from "./VillaForm";
import Swal from "sweetalert2";
import './Styles.css'
function Villa() {
    const [updatedVilla, setUpdatedVilla] = useState([])
    const [villa, setVilla] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const GetVilla = async () => axios.get("https://localhost:7015/api/VillaApi/get")
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
                    await axios.delete(`https://localhost:7015/api/VillaApi/${id}`)
                    setVilla((prevState => prevState.filter(x => x.id !== id)))
                }
            }
        )
    }


    return (
        <div style={{background: '#282c34', color: "wheat"}}>
            <VillaForm villa={villa} setUpdatedVilla={setUpdatedVilla}/>
            <div className="Villas">
                {!isLoading && villa.map((villas) => {
                    const clearedDate = new Date(villas.createdDate).toDateString();
                    return(
                    <div className="villa" key={villas.id}>
                        <h3>{villas.name}</h3>
                        <div className="divider"></div>
                        <p>Occupancy: {villas.ocupancy}</p>
                        <p>Square Feet: {villas.sqft}</p>
                        <p>Rate: {villas.rate}</p>
                        <p>Details: <br/>{villas.details}</p>
                        <p>Date:{clearedDate}</p>
                        <button id='deleteBtn' className='btn btn-warning' onClick={() => deleteVilla(villas.id)}>X
                        </button>
                    </div>
                    ) })}
            </div>
        </div>
    );
}

export default Villa;