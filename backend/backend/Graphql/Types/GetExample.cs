namespace backend.Graphql.Types;

public class GetExample
{
    public bool Success { get; set; }
    
    public List<ExampleType> Examples { get; set; }
}