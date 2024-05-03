import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import "./selectNameModal.css"

export default function SelectNameModal({ openModal, closeModal, nameRef, setAction, modalType, validateName }) {

    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [validation, setValidation] = useState([])

    function submit() {
        closeModal();
        setAction(modalType)
    }

    function validateInput() {
        setValidation(validateName(nameRef.current.value));
    }

    useEffect(() => {
        setSubmitDisabled(Boolean(validation.length));
    }, [validation])

    useEffect(() => {
        validateInput();
    }, [])

    return (
        <Modal
            openModal={openModal}
            closeModal={closeModal}
            title='Välj namn'
            children={[
                validation.map(item => <div key={item} className="validation-error">{item}</div>),
                <div key='input-content' className="input-content">
                    <input className="name-input" placeholder='Profil namn' ref={nameRef} onChange={validateInput} />
                    <button className="modal-button" onClick={() => submit()} disabled={submitDisabled}>Spara</button>
                </div>
            ]}>
        </Modal>
    )
}