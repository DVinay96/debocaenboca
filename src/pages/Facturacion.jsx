import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import bg from "../assets/images/mezcales.png";
import emailjs from '@emailjs/browser';

const Facturacion = () => {
  const [formData, setFormData] = useState({
    numeroOrden: "",
    rfc: "",
    nombre: "",
    domicilio: "",
    codigoPostal: "",
    usoComprobante: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const usosComprobante = [
    { value: "G01", label: "G01 - Adquisición de mercancías" },
    { value: "G02", label: "G02 - Devoluciones, descuentos o bonificaciones" },
    { value: "G03", label: "G03 - Gastos en general" },
    { value: "P01", label: "P01 - Por definir" },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.numeroOrden.trim()) {
      newErrors.numeroOrden = "El número de orden es obligatorio";
    }
    
    if (!formData.rfc.trim()) {
      newErrors.rfc = "El RFC es obligatorio";
    } else if (!/^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9][0-9A]$/.test(formData.rfc)) {
      newErrors.rfc = "El formato del RFC no es válido";
    }
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre o razón social es obligatorio";
    }
    
    if (!formData.domicilio.trim()) {
      newErrors.domicilio = "El domicilio fiscal es obligatorio";
    }
    
    if (!formData.codigoPostal.trim()) {
      newErrors.codigoPostal = "El código postal es obligatorio";
    } else if (!/^\d{5}$/.test(formData.codigoPostal)) {
      newErrors.codigoPostal = "El código postal debe ser de 5 dígitos";
    }
    
    if (!formData.usoComprobante) {
      newErrors.usoComprobante = "Debe seleccionar un uso de comprobante";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await emailjs.sendForm(
        'service_5t32vns', // Replace with your actual service ID
        'template_vke7tgd', // Replace with your actual template ID
        formRef.current, // This sends all the form fields as they are named in the form
        {
          publicKey: 'yALfnzOtdg45AlP5V', // Replace with your actual public key
        }
      );
      
      console.log("EmailJS Response:", response);
      
      if (response.status === 200) {
        // Success message
        setSubmitStatus({
          success: true,
          message: "¡Información fiscal enviada correctamente! Recuerde enviar su constancia de situación fiscal a ctorres@gccinternational.mx para completar el proceso.",
        });
        
        // Reset form
        setFormData({
          numeroOrden: "",
          rfc: "",
          nombre: "",
          domicilio: "",
          codigoPostal: "",
          usoComprobante: "",
        });
      } else {
        throw new Error(`Error al enviar el correo: Status ${response.status}`);
      }
    } catch (error) {
      console.error("EmailJS Error Details:", error);
      setSubmitStatus({
        success: false,
        message: "Ha ocurrido un error al enviar la información. Por favor, inténtelo de nuevo.",
      });
    } finally {
      setIsLoading(false);
      
      // Clear status after 7 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 7000);
    }
  };

  return (
    <PageContainer>
      <Header>
        <PageTitle>Información Fiscal</PageTitle>
      </Header>
      
      <FormContainer>
        <FormDescription>
          Complete el siguiente formulario con su información fiscal para la facturación.
          Todos los campos son obligatorios.
        </FormDescription>
        
        <ImportantNotice>
          <NoticeIcon>ℹ️</NoticeIcon>
          <NoticeText>
            <strong>Importante:</strong> Para completar su solicitud de facturación, deberá enviar su Constancia de Situación Fiscal por correo electrónico a:{' '}
            <EmailLink href="mailto:ctorres@gccinternational.mx">ctorres@gccinternational.mx</EmailLink>
            <br/>
            Incluya su número de orden en el asunto del correo.
          </NoticeText>
        </ImportantNotice>
        
        {submitStatus && (
          <StatusMessage success={submitStatus.success}>
            {submitStatus.message}
          </StatusMessage>
        )}
        
        <Form onSubmit={handleSubmit} ref={formRef}>
          <FormGroup>
            <FormLabel>Número de Orden</FormLabel>
            <FormInput
              type="text"
              name="numeroOrden" // The name must match the template variable
              value={formData.numeroOrden}
              onChange={handleChange}
              placeholder="Ej. ORD-12345"
              hasError={errors.numeroOrden}
            />
            {errors.numeroOrden && <ErrorMessage>{errors.numeroOrden}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <FormLabel>RFC</FormLabel>
            <FormInput
              type="text"
              name="rfc" // The name must match the template variable
              value={formData.rfc}
              onChange={handleChange}
              placeholder="Ej. XAXX010101000"
              hasError={errors.rfc}
            />
            {errors.rfc && <ErrorMessage>{errors.rfc}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Nombre o Razón Social</FormLabel>
            <FormInput
              type="text"
              name="nombre" // The name must match the template variable
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre completo o razón social"
              hasError={errors.nombre}
            />
            {errors.nombre && <ErrorMessage>{errors.nombre}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Domicilio Fiscal</FormLabel>
            <FormTextarea
              name="domicilio" // The name must match the template variable
              value={formData.domicilio}
              onChange={handleChange}
              placeholder="Dirección completa de su domicilio fiscal"
              hasError={errors.domicilio}
            />
            {errors.domicilio && <ErrorMessage>{errors.domicilio}</ErrorMessage>}
          </FormGroup>
          
          <FormRow>
            <FormGroup>
              <FormLabel>Código Postal</FormLabel>
              <FormInput
                type="text"
                name="codigoPostal" // The name must match the template variable
                value={formData.codigoPostal}
                onChange={handleChange}
                placeholder="Ej. 72000"
                maxLength={5}
                hasError={errors.codigoPostal}
              />
              {errors.codigoPostal && <ErrorMessage>{errors.codigoPostal}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Uso del Comprobante</FormLabel>
              <FormSelect
                name="usoComprobante" // The name must match the template variable
                value={formData.usoComprobante}
                onChange={handleChange}
                hasError={errors.usoComprobante}
              >
                <option value="">Seleccione una opción</option>
                {usosComprobante.map((uso) => (
                  <option key={uso.value} value={uso.value}>
                    {uso.label}
                  </option>
                ))}
              </FormSelect>
              {errors.usoComprobante && <ErrorMessage>{errors.usoComprobante}</ErrorMessage>}
            </FormGroup>
          </FormRow>
          
          {/* Hidden field to send the uso comprobante label */}
          <input 
            type="hidden" 
            name="usoComprobanteLabel" 
            value={usosComprobante.find(uso => uso.value === formData.usoComprobante)?.label || ""}
          />
          
          <ButtonGroup>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Información Fiscal"}
            </SubmitButton>
            <CancelButton as={Link} to="/tienda">
              Cancelar
            </CancelButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const PageContainer = styled.div`
  margin: 0 auto;
`;

const Header = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  width: 100vw;
  max-width: 100vw;
  box-sizing: border-box;
  padding: 6rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #ffff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 3rem auto 5rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease forwards;

  @media (max-width: 992px) {
    margin: 2rem 2rem 4rem;
    padding: 1.5rem;
  }
`;

const ImportantNotice = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem 1.5rem;
  margin-bottom: 2rem;
  background-color: #f0f7ff;
  border: 1px solid #c5dbff;
  border-radius: 8px;
  border-left: 4px solid #3676e8;
`;

const NoticeIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 1rem;
  line-height: 1;
`;

const NoticeText = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
  
  strong {
    color: #1d4ed8;
  }
`;

const EmailLink = styled.a`
  color: #5c0e0e;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FormDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatusMessage = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  background-color: ${props => props.success ? "#e0f7e6" : "#f9e0e0"};
  color: ${props => props.success ? "#1e7c3a" : "#c02424"};
  border-left: 4px solid ${props => props.success ? "#2da350" : "#d83b3b"};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #5c0e0e;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid ${props => props.hasError ? "#d83b3b" : "#ddd"};
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${props => props.hasError ? "#d83b3b" : "#5c0e0e"};
    box-shadow: 0 0 0 2px ${props => props.hasError ? "rgba(216, 59, 59, 0.2)" : "rgba(92, 14, 14, 0.2)"};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid ${props => props.hasError ? "#d83b3b" : "#ddd"};
  border-radius: 8px;
  min-height: 100px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${props => props.hasError ? "#d83b3b" : "#5c0e0e"};
    box-shadow: 0 0 0 2px ${props => props.hasError ? "rgba(216, 59, 59, 0.2)" : "rgba(92, 14, 14, 0.2)"};
  }
`;

const FormSelect = styled.select`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid ${props => props.hasError ? "#d83b3b" : "#ddd"};
  border-radius: 8px;
  background-color: white;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${props => props.hasError ? "#d83b3b" : "#5c0e0e"};
    box-shadow: 0 0 0 2px ${props => props.hasError ? "rgba(216, 59, 59, 0.2)" : "rgba(92, 14, 14, 0.2)"};
  }
`;

const ErrorMessage = styled.div`
  color: #d83b3b;
  font-size: 0.85rem;
  margin-top: 0.4rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #5c0e0e;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  flex: 2;

  &:hover {
    background-color: #7c1a1a;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #b98a8a;
    cursor: not-allowed;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.9rem 1.5rem;
  }
`;

const CancelButton = styled.button`
  background-color: #f8f8f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  flex: 1;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #e8e8e2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.9rem 1.5rem;
  }
`;

export default Facturacion;