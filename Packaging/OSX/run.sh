sh compile.sh && sh test.sh && sh package.sh && sh upload.sh

# Notify the user that the package has been built
osascript -e "display notification \"${NAME} ${VERSION} has been successfully built.\" with title \"Build Complete\" sound name \"Submarine\""