/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import EditProperty from './EditProperty';
import Modal from './Modal';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import {
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
export const SellerPropertyCard = ({
  property,
  onPropertyDeleted,
  onPropertyEdited,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const handleDelete = () => {
    fetch(`${backendUrl}/v1/property/${property._id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setDeleteSuccess(true);
          onPropertyDeleted();
        } else {
          throw new Error('Failed to delete property');
        }
      })
      .catch((error) => {
        console.error('Error deleting property:', error);
      });
    setOpenDeleteDialog(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/v1/users/${property.userId}`
        );
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [property.userId]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      {deleteSuccess && (
        <Alert severity="success">Property deleted successfully</Alert>
      )}

      <div>
        <div className="h-48 overflow-hidden">
          <img
            className="w-full"
            src="https://via.placeholder.com/400x300.png?text=House+Image"
            alt="House"
          />
        </div>
        <div className="px-6 py-4">
          <div className="mb-2 flex flex-row justify-between">
            <div className="font-bold text-xl mb-2">{property.location}</div>
            <div className="flex space-x-2">
              <Tooltip title="Edit Property">
                <ModeEditOutlineOutlinedIcon
                  onClick={() => setIsModalOpen(true)}
                />
              </Tooltip>
              <Tooltip title="Delete Property">
                <DeleteOutlinedIcon onClick={() => setOpenDeleteDialog(true)} />
              </Tooltip>
            </div>
          </div>
          {user && (
            <p className="text-gray-700 text-base">
              Seller: {user.data.firstname} {user.data.lastname}
            </p>
          )}
          <p className="text-gray-700 text-base">Area: {property.area} sq ft</p>
          <p className="text-gray-700 text-base">
            Bedrooms: {property.bedrooms}
          </p>
          <p className="text-gray-700 text-base">
            Bathrooms: {property.bathrooms}
          </p>
          <div className="px-6 pt-4 pb-2">
            {property.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EditProperty
          onClose={handleCloseModal}
          property={property}
          onEditSuccess={onPropertyEdited}
        />
      </Modal>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Property?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this property?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SellerPropertyCard;
