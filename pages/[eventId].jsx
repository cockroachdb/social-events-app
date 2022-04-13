import { useRouter } from "next/router";

const PeoplePage = () => {
  const { query } = useRouter();
  const [people, setPeople] = React.useState([]);

  const fetchPeople = async (eventId) => {
    const response = await fetch(`/api/people?eventId=${eventId}`);
    const res = await response.json();
    setPeople(res.people);
  };

  React.useEffect(async () => {
    await fetchPeople(query.eventId);
  }, []);
  return (
    <Container>
      <Row className="justify-content-md-between">
        {people.map((p) => (
          <Card key={p.id} className="sml-card">
            <Card.Body>
              <Card.Text>{p.name}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};
export default PeoplePage;
