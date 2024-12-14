import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CardContainer, CardFlex, ReviewCardContainer } from '../../../components/club/ClubCard.style';
import { Body, Input, Icon, Heading, Avatar, useOverlay, Modal, Button } from 'pov-design-system';
import { useClubMemberQuery } from '../../../hooks/queries/useClubsQuery';
import { useChangeLeaderMutation } from '../../../hooks/queries/useEditClubMutation';

function Index() {
  const { clubId } = useParams<{ clubId: string }>();

  const { clubsData } = useClubMemberQuery(clubId!);

  const [searchKeyword, setSearchKeyword] = useState('');

  //const filteredClubs = clubsData?.data.memberList.filter((member) => member.nickname.toLowerCase().includes(searchKeyword.toLowerCase())) || [];
  const { isOpen: isSaveOpen, open: saveOpen, close: saveClose } = useOverlay();

  const leaderChangeMutation = useChangeLeaderMutation();

  const handleChange = (email: string) => {
    const requestData = {
      newLeaderEmail: email,
    };

    leaderChangeMutation.mutate(
      { clubId: clubId!, ...requestData },
      {
        onSuccess: () => {
          saveClose();
        },
      }
    );
  };

  return (
    <>
      <Input
        placeholder="검색어를 입력해 주세요"
        icon={<Icon icon="search" color="#ADACAF" />}
        value={searchKeyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
      />

      {clubsData?.data.memberList.map((member) => {
        return (
          <CardContainer key={member.nickname}>
            <CardFlex>
              <Avatar size="small" username={member.nickname} src={member.profileImage} />
              <ReviewCardContainer>
                <Heading size="large">{member.nickname}</Heading>
                {member.isLeader ? <Body size="large">그룹장</Body> : <Body size="large">멤버</Body>}
              </ReviewCardContainer>
              <Heading size="small" css={{ color: '#1BD27D' }} onClick={saveOpen}>
                그룹장 임명하기
              </Heading>
            </CardFlex>

            <Modal isOpen={isSaveOpen} closeModal={saveClose}>
              <Heading>클럽장을 위임하시겠습니까?</Heading>
              <Button variant="primary" onClick={handleChange(member.email)} css={{ marginTop: '20px' }}>
                확인
              </Button>
            </Modal>
          </CardContainer>
        );
      })}
    </>
  );
}

export default Index;
