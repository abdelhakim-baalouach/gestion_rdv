package ma.rdv.error;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource) {
        super(String.format("%s", resource));
    }
}
