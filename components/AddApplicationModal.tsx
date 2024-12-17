"use client"

import {useState, useEffect} from "react";
import { verifyApplication } from "@/utils/actions";
import { Application } from "@/utils/globalTypes";
import { useApplications } from "@/contexts/ApplicationsContext";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

export default function AddApplicationModal({isOpen, onClose}: ModalProps) {

    const {addApplication} = useApplications();

    const [companyName, setCompanyName] = useState("");
    const [positionTitle, setPositionTitle] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");
    const [applicationLink, setApplicationLink] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const inputStyle = "mt-1 p-2 border rounded w-full"

    const [validInputs, setValidInputs] = useState({
        companyName: true,
        positionTitle: true,
        status: true,
    });

    async function handleNewApplication(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const companyNameValid = !!formData.get('companyName');
        const positionTitleValid = !!formData.get('positionTitle');
        const statusValid = !!formData.get('status');
        
        setValidInputs({
          companyName: companyNameValid,
          positionTitle: positionTitleValid,
          status: statusValid,
        });
        const result = await verifyApplication(formData);
        if (result?.error) {
            setErrorMessage(result.error);
        } else {
            addApplication(result?.data as Application);
            onClose();
        }
    }

    useEffect(() => {
        if (isOpen) {
            setCompanyName("");
            setPositionTitle("");
            setApplicationDate("");
            setStatus("");
            setNotes("");
            setApplicationLink("");
            setValidInputs({
                companyName: true,
                positionTitle: true,
                status: true,
              });
            setErrorMessage("");
        }
    }, [isOpen]);


    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        
        }
    });

    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-red-100 p-4 rounded shadow-lg max-w-md w-full text-black">
                <form className="flex flex-col mb-2" onSubmit={handleNewApplication}>
                    <label className="">Company Name:</label>
                    <input name="companyName" 
                        autoFocus
                        className={`${inputStyle} ${validInputs.companyName ? 'border-gray-300' : 'border-red-500'} `}
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyName}
                        ></input>

                    <label>Position Title:</label>
                    <input 
                        name="positionTitle"
                        className={`${inputStyle} ${validInputs.companyName ? 'border-gray-300' : 'border-red-500'} `}
                        onChange={(e) => setPositionTitle(e.target.value)}
                        value={positionTitle}
                        ></input>

                    <label>Application Date (will default to {new Date().toLocaleDateString()}):</label>
                    <input 
                        name="applicationDate"
                        className={`${inputStyle} border-gray-300`}
                        onChange={(e) => setApplicationDate(e.target.value)}
                        type="date"
                        value={applicationDate}
                        ></input>

                    <label>Status:</label>
                    <input 
                        name="status"
                        className={`${inputStyle} ${validInputs.companyName ? 'border-gray-300' : 'border-red-500'} `}
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        ></input>

                    <label>Notes:</label>
                    <input 
                        name="applicationNotes"
                        className={`${inputStyle} border-gray-300`}
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        ></input>

                    <label>Application Link (optional, please include http:// or https://):</label>
                    <input 
                        name="applicationLink"
                        className={`${inputStyle} border-gray-300`}
                        onChange={(e) => setApplicationLink(e.target.value)}
                        value={applicationLink}
                        ></input>
                    <div className="flex mx-auto gap-x-11 mt-2">
                        <button type="submit" className="submit-button">All set</button>
                        <button className="rounded text-base submit-button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
                {errorMessage && 
                <div className="credential-error-message !bg-[#FBB874]">
                    <p className="!text-[#FF0800] text-lg">{errorMessage}</p>
                </div>
                }
            </div>
        </div>)
}