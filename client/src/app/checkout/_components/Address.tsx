"use client"
import React, { useState } from 'react';
import { useAddress, useCreateAddress } from '@/hooks/useAddress';
import { ICreateAddress } from '@/types/address';

const AddressManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Fixed page size
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const { data, isLoading, isError } = useAddress({ page, pageSize });
  const { mutate: addAddress } = useCreateAddress();
  const [newAddress, setNewAddress] = useState<ICreateAddress>({
    street_address: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone: '',
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddAddress = () => {
    addAddress(newAddress, {
      onSuccess: () => {
        alert('Address added successfully!');
        setNewAddress({
          street_address: '',
          address_line2: '',
          city: '',
          state: '',
          postal_code: '',
          country: '',
          phone: '',
        });
        setIsAddingNew(false);
      },
      onError: (error) => {
        console.error('Failed to add address:', error);
      },
    });
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  if (isLoading) return <p>Loading addresses...</p>;
  if (isError) return <p>Failed to load addresses. Please try again later.</p>;

  return (
    <div className="space-y-4">
      {!isAddingNew ? (
        <>
          <h1 className="text-xl font-bold">Address List</h1>
          {data?.data?.length ? (
            <ul className="space-y-2">
              {data.data.map((address) => (
                <li
                  key={address.id}
                  onClick={() => handleSelectAddress(address.id)}
                  className={`border p-4 rounded-lg shadow-sm relative ${selectedAddressId === address.id ? ' border-primary' : ''}`}
                >
                  <p>{address.street_address}</p>
                  {address.address_line2 && <p>{address.address_line2}</p>}
                  <p>
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                  <p>{address.country}</p>
                  <p>{address.phone}</p>
                  <label className="flex items-center space-x-2 absolute top-2 right-2">
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={address.id}
                      checked={selectedAddressId === address.id}
                      className="form-radio"
                    />
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found. Add a new address to get started.</p>
          )}
          <button
            onClick={() => setIsAddingNew(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Address
          </button>
          <div className="mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold">Add New Address</h1>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddAddress();
            }}
          >
            <input
              type="text"
              placeholder="Street Address"
              value={newAddress.street_address}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  street_address: e.target.value,
                }))
              }
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Address Line 2 (Optional)"
              value={newAddress.address_line2}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  address_line2: e.target.value,
                }))
              }
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  state: e.target.value,
                }))
              }
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Postal Code (Optional)"
              value={newAddress.postal_code}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  postal_code: e.target.value,
                }))
              }
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Country"
              value={newAddress.country}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              className="border p-2 w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="ml-4 text-gray-500 underline"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddressManagement;
