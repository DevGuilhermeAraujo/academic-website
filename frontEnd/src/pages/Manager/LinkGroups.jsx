import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import Panel from '../../components/accessPanel/Panel';
import './LinkGroups.css';
import { useParams } from 'react-router-dom';

const LinkGroups = () => {
    const { screenId } = useParams(); // Obtém o parâmetro da URL

    const [availableGroups, setAvailableGroups] = useState([]);
    const [linkedGroups, setLinkedGroups] = useState([]);
    const [initialAvailableGroups, setInitialAvailableGroups] = useState([]);
    const [initialLinkedGroups, setInitialLinkedGroups] = useState([]);
    const [selectedAvailableGroups, setSelectedAvailableGroups] = useState([]);
    const [selectedLinkedGroups, setSelectedLinkedGroups] = useState([]);

    useEffect(() => {
        // Fetch both available and linked groups in one request
        axios.get(`http://localhost:3001/api/access/groupsData/${screenId}`)
            .then(response => {
                const { availableGroups, linkedGroups } = response.data;

                if (Array.isArray(availableGroups) && Array.isArray(linkedGroups)) {
                    setAvailableGroups(availableGroups);
                    setLinkedGroups(linkedGroups);
                    setInitialAvailableGroups(availableGroups);
                    setInitialLinkedGroups(linkedGroups);
                } else {
                    console.error('Dados recebidos não são arrays:', response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados dos grupos:', error);
            });
    }, [screenId]);

    const handleCheckboxChange = (groupId, type) => {
        if (type === 'available') {
            setSelectedAvailableGroups(prev =>
                prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
            );
        } else {
            setSelectedLinkedGroups(prev =>
                prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
            );
        }
    };

    const moveToLinked = () => {
        setLinkedGroups(prev => [
            ...prev,
            ...availableGroups.filter(group => selectedAvailableGroups.includes(group.id))
        ]);
        setAvailableGroups(prev => prev.filter(group => !selectedAvailableGroups.includes(group.id)));
        setSelectedAvailableGroups([]);
    };

    const moveToAvailable = () => {
        setAvailableGroups(prev => [
            ...prev,
            ...linkedGroups.filter(group => selectedLinkedGroups.includes(group.id))
        ]);
        setLinkedGroups(prev => prev.filter(group => !selectedLinkedGroups.includes(group.id)));
        setSelectedLinkedGroups([]);
    };

    const handleSave = async () => {
        const addedGroups = linkedGroups.filter(group => !initialLinkedGroups.some(initialGroup => initialGroup.id === group.id));
        const removedGroups = initialLinkedGroups.filter(group => !linkedGroups.some(currentGroup => currentGroup.id === group.id));

        const payload = {
            screenId,
            addedGroups: addedGroups.map(group => group.id),
            removedGroups: removedGroups.map(group => group.id),
        };

        try {
            const response = await axios.post('http://localhost:3001/api/access/linkGroups', payload);
            if (response.data.success) {
                console.log('Grupos atualizados com sucesso');
            } else {
                console.error('Falha ao atualizar grupos:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };

    const handleCancel = () => {
        // Cancel changes
        console.log('Cancelling changes...');
    };

    return (
        <Layout sidebarType="" showBackButton={true} previousPage="/access-management">
            <Panel
                availableGroups={availableGroups}
                linkedGroups={linkedGroups}
                selectedAvailableGroups={selectedAvailableGroups}
                selectedLinkedGroups={selectedLinkedGroups}
                handleCheckboxChange={handleCheckboxChange}
                moveToLinked={moveToLinked}
                moveToAvailable={moveToAvailable}
                handleSave={handleSave}
                handleCancel={handleCancel}
            />
        </Layout>
    );
};

export default LinkGroups;
