
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Patient {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  number: string;
  status: string;
}

const STORAGE_KEY = "patientStatusBoardData";

const generatePatientNumber = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

type Field = {
  name: keyof Patient;
  label: string;
  type?: string;
};

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Patient>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    number: "",
    status: "Checked In",
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedPatients = localStorage.getItem(STORAGE_KEY);
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editMode && editIndex !== null) {
      const updated = [...patients];
      updated[editIndex] = formData;
      setPatients(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setEditMode(false);
      setEditIndex(null);
    } else {
      const newPatient: Patient = {
        ...formData,
        number: generatePatientNumber(),
        status: "Checked In",
      };
      const updated = [...patients, newPatient];
      setPatients(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    setFormData({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
      number: "",
      status: "Checked In",
    });
  };

  const handleEditPatient = (index: number) => {
    setFormData({ ...patients[index] });
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDeletePatient = (index: number) => {
    const updated = patients.filter((_, i) => i !== index);
    setPatients(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const fields: Field[] = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "street", label: "Street Address" },
    { name: "city", label: "City" },
    { name: "state", label: "State / Province / Region" },
    { name: "country", label: "Country" },
    { name: "phone", label: "Phone" },
    { name: "email", label: "Email", type: "email" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col">
      
      {/* Navbar */}
      <nav className="flex bg-blue-600 text-white p-4 shadow-md justify-around items-center">
        <ul className="flex justify-between w-full max-w-2xl ">
          <li className="cursor-pointer font-bold" onClick={() => navigate("/")}>🏠 Home</li>
          <li className="cursor-pointer font-bold" onClick={() => navigate("/admin")}>📋 Patient Info</li>
          <li className="cursor-pointer font-bold" onClick={() => navigate("/status-update")}>🔁 Status Update</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="w-[90vw] mx-auto space-y-10 mt-5">
        
        {/* Form Card */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              {editMode ? "Edit Patient" : "Add New Patient"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map(({ name, label, type }) => (
                  <div key={name}>
                    <Label htmlFor={name}>{label}</Label>
                    <Input
                      id={name}
                      name={name}
                      type={type || "text"}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                {editMode && (
                  <div className="col-span-1 sm:col-span-2">
                    <Label>Status</Label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    >
                      <option value="Checked In">Checked In</option>
                      <option value="Pre-Procedure">Pre-Procedure</option>
                      <option value="In-progress">In-progress</option>
                      <option value="Closing">Closing</option>
                      <option value="Recovery">Recovery</option>
                      <option value="Complete">Complete</option>
                      <option value="Dismissal">Dismissal</option>
                    </select>
                  </div>
                )}

                <div className="col-span-1 sm:col-span-2">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    {editMode ? "Update Patient" : "Add Patient"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Table Card */}
        <Card className="shadow-md rounded-2xl">
          <CardContent className="overflow-x-auto">
            <h2 className="text-xl font-bold text-blue-700 mb-4">All Patients</h2>
            {patients.length === 0 ? (
              <p className="text-gray-600">No patients found.</p>
            ) : (
              <table className="table-auto border border-gray-200 text-sm w-full">
                <thead>
                  <tr className="bg-blue-50 text-gray-700">
                    <th className="border px-3 py-2">#</th>
                    <th className="border px-3 py-2">Name</th>
                    <th className="border px-3 py-2">Email</th>
                    <th className="border px-3 py-2">Status</th>
                    <th className="border px-3 py-2">Edit</th>
                    <th className="border px-3 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">{p.firstName}</td>
                      <td className="border px-3 py-2">{p.email}</td>
                      <td className="border px-3 py-2">{p.status}</td>
                      <td className="border px-3 py-2">
                        <Button onClick={() => handleEditPatient(index)} className="bg-green-600 hover:bg-green-700 text-white">
                          Edit
                        </Button>
                      </td>
                      <td className="border px-3 py-2">
                        <Button onClick={() => handleDeletePatient(index)} className="bg-red-600 hover:bg-red-700 text-white">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminPage;
