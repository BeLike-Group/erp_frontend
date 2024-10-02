import React, { useState, useRef } from 'react';

function PrintSlip({ selectedStudent, feeData, onPrintComplete }) {
    const [isPrinting, setIsPrinting] = useState(false);
    const printRef = useRef(null);

    const handlePrint = () => {
        setIsPrinting(true);
        window.print();
        // setIsPrinting(false);
    };

    return (
        <div className="container mx-auto text-black">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handlePrint}
                disabled={isPrinting}
            >
                Print Slip
            </button>

            <button
                className="bg-red-500 text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={onPrintComplete}
                disabled={isPrinting}
            >
                Back
            </button>

            {/* Content to be printed */}
            <div ref={printRef} className="print-section">
                <div className="a4-page">
                    <div className="grid grid-cols-3 gap-4">
                        {["Student Copy", "Office Copy", "Accounts Copy"].map((title) => (
                            <div key={title} className="bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                                <table className="w-full">
                                    <tbody>
                                        <tr><td>Roll Number:</td><td>{selectedStudent.studentId}</td></tr>
                                        <tr><td>Name:</td><td>{selectedStudent.studentName}</td></tr>
                                        <tr><td>Email:</td><td>{selectedStudent.studentEmail}</td></tr>
                                        <tr><td>Grade:</td><td>{selectedStudent.studentGrade.gradeCategory}</td></tr>
                                        <tr><td>Total Fee:</td><td>{feeData.totalFee}</td></tr>
                                        <tr><td>Amount Paid:</td><td>{feeData.amountReceived}</td></tr>
                                        <tr><td>Remaining Amount:</td><td>{feeData.remainingAmount}</td></tr>
                                        <tr><td>Date:</td><td>{feeData.submissionDate}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Styles for printing on A4 in landscape mode */}
            <style jsx>{`
                @media print {
                    @page {
                        size: landscape; /* Set the page to landscape */
                        margin: 0; /* Optional: set margins to 0 */
                    }
                    body * {
                        visibility: hidden;
                    }
                    .print-section, .print-section * {
                        visibility: visible;
                    }
                    .print-section {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 297mm; /* Width for landscape */
                        height: 210mm; /* Height for landscape */
                    }

                    /* A4 page size in landscape */
                    .a4-page {
                        page-break-after: always;
                        width: 297mm; /* Width for landscape */
                        height: 210mm; /* Height for landscape */
                        padding: 20mm;
                        box-sizing: border-box;
                    }

                    .a4-page table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    
                    /* Ensure the table adjusts well */
                    table td {
                        word-wrap: break-word; /* Allow text to wrap within table cells */
                    }
                }
            `}</style>
        </div>
    );
}

export default PrintSlip;
