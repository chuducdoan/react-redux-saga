import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createUserPending } from "../../redux/user/user.slide";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const UserCreateModal = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const isCreating = useAppSelector((state) => state.user.isCreating);
  const isCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    dispatch(createUserPending({ email, name }));
  };

  useEffect(() => {
    if (isCreateSuccess) {
      setIsOpenCreateModal(false);
      setEmail("");
      setName("");
      toast.success("Create user successfully!");
    }
  }, [isCreateSuccess]);

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Name">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          {!isCreating ? (
            <>
              <Button
                variant="warning"
                onClick={() => setIsOpenCreateModal(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()}>Save</Button>
            </>
          ) : (
            <Button disabled>
              <Spinner as={"span"} animation="border" role="status" size="sm" />
              &nbsp; loading...
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCreateModal;
